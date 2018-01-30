import Article from '../models/articleModel';
import Channel from '../models/channelModel';
import Subscriber from '../models/subscriberModel';

module.exports = {

    /*
     * Request to fetch all articles posted on channel
     */
    allPosts(user, req, res, next) {

        var user = user._id;
        var published_channel = req.params.published_channel;
        var page_req = req.params.pagenumber;
        var total_count;

        Article.count({
            "published_channel": published_channel
        }).where("published").equals(true).then(number => {
            if (number) {

                var total_count = number;
                var perPage = 2;
                var maxPage = Math.ceil(total_count / perPage);

                if (page_req < 1 || page_req > maxPage) {
                    res.status(409).json({
                        status: false,
                        message: "Please send a valid Page Number"
                    });
                } else {
                    var page = Math.max(1, page_req);
                    var tempPage = page - 1;

                    Article.find({
                        "published_channel": published_channel,
                        "published": true
                    }).limit(perPage).skip(perPage * tempPage).then(data => {
                        if (data.length) {
                            res.status(200).json({
                                status: true,
                                message: "Here are your posts",
                                data: data
                            });
                        } else {
                            res.status(404).json({
                                status: false,
                                message: "This channel has  no posts"
                            });
                        }
                    });
                }
            }
        })
        .catch (err => {
            res.status(500).json({
                status: false,
                error: err.message
            });
        });
    },

    /*
     * Request to add subscriber posted on channel
     */

    addSubscribers(user, req, res, next) {
        var user_id = user._id;
        var channel_id = req.body.channel_id;

        if (channel_id) {
            Channel.find({
                user_id
            }).then(data => {
                if (data.length) {
                    res.status(422).json({
                        status: false,
                        message: "This is your Channel..!!!"
                    })
                } else {

                    Subscriber.find({
                        channel_id, user_id
                    }).then(data => {

                        if (data.length) {
                            return res.status(400).json({
                                status: false,
                                message: "Already subscribed by you"
                            });
                        } else {

                            Channel.findById({
                                "_id": channel_id
                            }).then(docs => {

                                if (docs) {
                                    Channel.update({
                                        $inc: {
                                            'subscribers': 1
                                        }
                                    }).then(data => {
                                        var subscriber = new Subscriber({
                                            user_id, channel_id
                                        });

                                        subscriber.save().then(data => {
                                            res.status(200).json({
                                                status: true,
                                                message: "Subscribed Successfuly",
                                                data: data
                                            })
                                        });
                                  });
                                    
                                } else {
                                    res.status(400).json({
                                        status: false,
                                        message: `Cannot find any channel with this id $ {
                                            channel_id
                                        }`
                                    });
                                }
                            });
                        }
                    });
                }
            })
            .catch (err => {
                res.status(500).josn({
                    status: false,
                    error: err.message
                })
            });
        } else {
            res.status(400).json({
                status: false,
                message: "Empty request body , Send Channel id"
            })

        }
    },

    /*
     * Request to get all subscribers of channel
     */

    allSubscribers(req, res, next) {

        var channel_id = req.params.id;

        Subscriber.find({
            channel_id
        }).then(data => {
            if (data.length) {
                res.status(200).json({
                    status: true,
                    message: "All Subscribers for this channel",
                    subscribers: data
                });

            } else {
                res.status(200).josn({
                    status: false,
                    message: "No Subscribers Yet..!!!"
                })
            }
        })
    },

    singleChannel(req, res, next) {

      var channel_id = req.params.id;

        Channel.findByIdAndUpdate({_id: channel_id},
         { $inc : {"views": 1} } ,{new: true}
         )
        .populate({
            path: 'subscribed_by',
            model: 'subscriber',
            select: "user_id",
            populate: {
                path: 'user_id',
                select: "email"
            }
        }).populate({
            path: 'subscribed_by',
            model: 'subscriber',
            select: 'channel_id',
            populate: {
                path: 'channel_id',
                select: "channelTitle"
            }
        }).then(data => {
            if (data) {
                res.status(200).json({
                    status: true,
                    messsage: "Your channel details",
                    data
                });
            } else {
                res.status(200).json({
                    status: false,
                    message:`No data found with channel_id ${channel_id}`
                });
            }
        })
        .catch (err => {
            res.status(500).json({
                status: false,
                error: err.message  
            });
        });

    }

}
import userProfile from '../models/userModel';
import Likes from '../models/likesModel';
import article from '../models/articleModel'; 
import { storage, imageFileFilter } from '../config/fileUpload';
import multer from 'multer';
import Comment from '../models/commentModel';
import mongoose from 'mongoose';


module.exports = {

   /*
     * Handle Get Request the User Profile.
     * 1. Find User id And provides user profile data.
  */

    getProfile(user, req, res, next) {
        userProfile.find({
                "_id": user._id
            },{
                password:0
            })
            .populate('bookmarks','article_id')
            .then(data => {

                if (data.length) {
                    res.status(200).json({
                        status: true,
                        message: "User Profile Details",
                        profile: data
                    });
                } else {
                    res.status(200).json({
                        status: false,
                        message: `No Profile Data Found with id ${user._id}`
                    });
                }
            })
            .catch(err => {
                res.status(422).json({
                    status: false,
                    error: err
                });
            });
    },

  /*
     * Handle Put Request the User Profile Picture.
     * 1. Find User id And update user profile picture.
  */

    profilePicture(user, req, res, next) {
        var upload = multer({
            storage: storage,
             limits: {
              fileSize: 1024 * 1024 * 2
            },
            fileFilter: imageFileFilter
        }).single('profile_picture');

        upload(req, res, function(err) {
            if (err) {
                return res.status(400).json({
                    status:false,
                    message:err.message
                });
            }
            if(req.file){
            userProfile.find({
                    "_id": user._id
                })
                .then(data => {
                    if (data.length) {
                        userProfile.findByIdAndUpdate({
                                "_id": user._id
                            }, {
                                "profile_picture":req.file.path
                            },{"new":true})
                            .exec()
                            .then(result => {
                                res.status(200).json({
                                    message: 'profile  Picture updated',
                                    profile_picture:result.profile_picture

                                });
                            });                         
                      }
                })
                .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
            } else {
                res.status(400).json({
                     status:false,
                     message:"No file is sent in req"
                });
            }
        });
    },

  /*
     * Handle Put Request the User Profile cover Picture.
     * 1. Find User id And update user profile cover picture.
  */

    profileCoverPicture(user, req, res, next) {
        var upload = multer({
            storage: storage,
             limits: {
              fileSize: 1024 * 1024 * 2
            },
            fileFilter: imageFileFilter
        }).single('profile_cover_picture');

        upload(req, res, function(err) {
            if (err) {
                return res.status(400).json({
                    status:false,
                    message:err.message
                });
            }
            userProfile.find({
                    "_id": user._id
                })
                .then(data => {
                    if (data.length) {
                        userProfile.findByIdAndUpdate({
                                "_id": user._id
                            }, {
                                "profile_cover_picture":req.file.path
                            }, { "new": true})
                            .exec()
                            .then(result => {
                                res.status(200).json({
                                    message: 'profile Cover Picture updated',
                                    profile_cover_picture:result.profile_cover_picture
                                });
                            })                          
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        });
    },

   /*
     * Handle Put Request the User Profile Data.
     * 1. Find User id And update user profile Data.
  */
    createUpdateProfile(user, req, res, next) {


        userProfile.findOne({
                "_id": user._id
            })
            .then(data => {

                var updateOps = {};
                for (const ops of req.body) {

                    updateOps[ops.propName] = ops.value;
                }

                if (data.length) {
                    userProfile.update({
                            "_id": user._id
                        }, {
                            $set: updateOps
                        })
                        .exec()
                        .then(result => {
                            res.status(200).json({
                                message: 'user profile updated',

                            });
                        });
                } else {

                    var profile = new userProfile(
                        updateOps
                    );
                    profile.save()
                        .then(data => {
                            if (data) {
                                res.status(201).json({
                                    status: true,
                                    message: "User Profile Created Successfully",
                                    Profile: data
                                });
                            }
                        })                   
                 }
 
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });

            });

    },
    
    /*
     * Handle Get Request the User Likes .
     * 1. Find User id And sent back user likes details.
    */
    getLikes(user, req, res, next) {
        Likes.find({
                "user_id": user._id
            })
            .populate('article_id user_id', "_id")
            .then(data => {
                if (data.length) {
                    res.status(200).json({
                        status: true,
                        message: "Articles you have liked",
                        YourLikes: data
                    });
                } else {
                    res.status(200).json({
                        status: false,
                        message: `No Profile Data Found with id ${user._id}`
                    });
                }
            })

    },


    /*
     * Handle Post Request to add  User likes On articles.
     * 1. Find User id And update user profile Data.
  */
    addLikes(user, req, res, next) {
        var user_id = user._id;

        var count;
        if (req.body.article_id) {
            var article_id = req.body.article_id;
            Likes.find({
                    article_id,
                    user_id
                })
                .then(data => {

                    if (data.length) {
                        return res.status(400).json({
                            status: false,
                            message: "Already liked by you"
                        });
                    } else {
                        article.findOneAndUpdate({
                                "_id": article_id
                            }, {
                                $inc: {
                                    'likes': 1
                                }
                            },

                            function(err, docs) {
                                if (err) {
                                    console.log(err)
                                }

                                var newlikes = new Likes({
                                    user_id,
                                    article_id
                                });

                                newlikes.save()
                                    .then(data => {

                                        res.status(200).json({
                                            status: true,
                                            data: data
                                        })
                                    });
                            })
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });

                });
                } else {
                    res.status(400).json({
                        status: false,
                        message: "send article id"
                    })
                }
    },

    /*
     * Handle Post Request to add  User Comments On articles.
     * 1. Find User id And save comments Data to Database.
  */
     addComments(user, req, res, next) {

        var user_id = user._id;

        if (req.body.article_id) {

            var article_id = req.body.article_id;
            var comment = req.body.comment;

            var comment = new Comment({
                article_id,
                user_id,
                comment
            })
            comment.save()
                .then(data => {
                    res.status(200).json({
                        status: true,
                        message: "All Comments",
                        comment: data
                    });
                })
        } else {
            res.status(400).json({
                status: false,
                message: "send article id"
            })
        }
    },
  

  /*
     * Handle Get Request for  All Comments On articles.
     * 1. Find User id And Retrive comments Data from database.
  */

    getComments(user, req, res, next) {

        Comment.find({
                "user_id": user._id
            })
            .populate('article_id user_id', "_id")
            .then(data => {
                if (data.length) {
                    res.status(200).json({
                        status: true,
                        message: "Articles you have Comment",
                        Comment: data
                    });
                } else {
                    res.status(400).json({
                        status: false,
                        message: `No comment Data Found with id ${user._id}`
                    });
                }
            })
    },

    getFeeds(user, req, res, next) {

        userProfile.find({_id:user._id})
                   .populate({
                        path: 'feeds',
                        model: 'Channel',
                        populate: {
                         path: 'articles',
                         model: 'article'
                       }
                    })
                   .then( data => {
                        if(data){
                            res.status(200).json({
                                status:true,
                                message:"Your feeds",
                                feeds:data
                            })                           
                        }
                        else{
                            res.status(404).json({
                                status:false,
                                message:"No data found"
                            })
                        }
                   })
    }

   
}
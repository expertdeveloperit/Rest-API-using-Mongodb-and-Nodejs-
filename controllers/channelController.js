import mongoose from 'mongoose';
import channelModel from '../models/channelModel';
import Article from '../models/articleModel';
import teamModel from '../models/channelTeamModel';
import { storage, imageFileFilter, videoFileFilter } from '../config/fileUpload';
import multer from 'multer';
// import {FB, FacebookApiException} from 'fb';
// var graph = require('fbgraph');

module.exports = {
	/*
	  * Handle Post Request to create Channel.
  	*/
	createChannel(user,req,res,next){
		var user_id            = user._id;
		var channelTitle       = req.body.channelTitle;
		var channelDescription = req.body.channelDescription;

		var newChannel = new channelModel({
			user_id,
			channelTitle,
			channelDescription
		});

	 newChannel.save()
			.then(data => {
				res.status(200).json({
					status:true,
					message:"Congratulations on creating a new channel",
					data:data
				});
			})
			.catch(err => {
				if(err.code === 11000 || err.errmsg == "E11000 duplicate key error collection"){
					res.status(400).json({
						status:false,
						error:"This channel title already exists, Select another one"
					});
				}
				else{
					res.status(400).json({
						status:false,
						error:err.message
					});
				}
				
			});
	},

	/*
	     * Handle Post Request to add  the Channel team.
	     * 1. Find Channel id And add team.
  	*/

	 addTeam(user,req,res,next){
	 	
	 	var user = user._id;
	 	var channel_id = req.body.channel_id;

	 	channelModel.findOne({"user_id":user,"_id":channel_id})
	 	.then(data => {
	 		if(data){
	 			console.log(req.body);
	 			var user_id     = user;
	 			var channel     = channel_id;
	 			var member_name = req.body.member_name;
	 			var shares      = req.body.shares;

	 			var newTeam = new teamModel({
	 				user_id,
	 				channel,
	 				member_name,
	 				shares
	 			});

	 			newTeam.save()
	 			.then(data => {
	 				if(data){
	 					res.status(200).json({
	 						status:true,
	 						message:"Team added successfully",
	 						data:data
	 					});
	 				}
	 			});	 			
	 		}
	 		else{
	 			res.status(404).json({
	 				status:false,
	 				message:"Create channel first to add team"
	 			});
	 		}
	 	})
	 	.catch(err => {
	 		  res.status(409).json({
	 			  status:false,
	 			  error:err.message
	 		 });
	 	});
	 },

	 /*
	     * Handle Put Request the Channel Logo.
	     * 1. Find Channel id And update Channel Logo.
  	*/

	 addLogo(user,req,res,next){
   		
	 	var user = user._id;

	 	var upload = multer({
            storage: storage,
             limits: {
              fileSize: 1024 * 1024 * 2
            },
            fileFilter: imageFileFilter
        }).single('logo');

	 	upload(req,res,function(err){

	 		if(err){
	 			res.status(400).json({
	 				status:false,
	 				error:err.message
	 			});
	 		}
	 		console.log(req.file)
	 		var logo = req.file.path;
	 		var id = req.body.id;

	 		channelModel.findOne({"_id":id})
	 		.then(data => {
	 			console.log(data,"data");
	 			if(!data){
	 				res.status(200).json({
	 					status:false,
	 					message:"Sorry!create channel first"
	 				});
	 			}
	 			if(data){
	 				channelModel.findOneAndUpdate({"_id":id},{"logo":logo}, { new: true },function(err,data){
	 					console.log("entered in saving loop");
	 					if(err){
	 						res.status(400).json({
	 							status:false,
	 							error:err,
	 							message:"error while uploading"
	 						});
	 					}
	 					else{
	 						res.status(200).json({
	 							status:true,
	 							message:"logo updated successfully",
	 							data:data
	 						});
	 					}
	 				})
	 			}
	 		})
	 		.catch(err => {
	 			res.status(500).json({
	 				status:false,
	 				error:err.message
	 			});
	 		});
	 	});
	 },

	 /*
	     * Handle Put Request the Channel cover image.
	     * 1. Find Channel id And update Channel cover image.
  	*/

	 addCoverimage(user,req,res,next){
	 	var user = user._id;
	 	
	 	var upload = multer({
            storage: storage,
             limits: {
              fileSize: 1024 * 1024 * 2
            },
            fileFilter: imageFileFilter
        }).single('cover_image');

	 	upload(req,res,function(err){

	 		if(err){
	 			res.status(500).json({
	 				status:false,
	 				error:err.message
	 			});
	 		}

	 		var cover_image = req.file.path;
	 		var id = req.body.id;

	 		channelModel.findOne({"_id":id})
	 		.then(data => {

	 			if(!data){
	 				res.status(200).json({
	 					status:false,
	 					message:"Sorry!create channel first"
	 				});
	 			}
	 			if(data){
	 				channelModel.findOneAndUpdate({"_id":id},{"cover_image":cover_image},{ new: true },function(err,data){
	 					if(err){
	 						res.status(400).json({
	 							status:false,
	 							error:err,
	 							message:"error while uploading"
	 						});
	 					}
	 					else{
	 						res.status(200).json({
	 							status:true,
	 							message:"cover_image updated successfully",
	 							data:data
	 						});
	 					}
	 				});
	 			}
	 		})
	 		.catch(err => {
	 			res.status(500).json({
	 				status:false,
	 				error:err.message
	 			});
	 		});
	 	});
	 },

	 /*
	     * Handle Get Request to fetch  Channel details.
	     * 1. Find Channel id And update Channel cover image.
  	*/

	 getchannel(user,req,res,next){
	 	var user_id = user._id;
        var channel_id = req.params.id;

	 	channelModel.find({"_id":channel_id,"user":user_id})
	 	.populate(
	 		'team',
	 		'_id member_name shares'
	 		)
	 	.then(data => {
	 		
	 		if(data){
	 			res.status(200).json({
	 				status:true,
	 				message:"Your channel details",
	 				data:data
	 			});
	 		}
	 		else {
	 			res.status(409).json({
	 				status:false,
	 				message:"You don't owe any channel yet"
	 			});
	 		}
	 	})
	 	.catch(err => {
	 		res.status(500).json({
	 			status:false,
	 			error:err.message
	 		});
	 	});
	 },

	  /*
	     * Handle Put Request the Channel Video.
	     * 1. Find Channel id And update Channel Video.
  	*/
	
	 addVideo(user,req,res,next){
	    var user = user._id;

	 	var upload = multer({
            storage: storage,
             limits: {
              fileSize: 1024 * 1024 * 30
            },
            fileFilter: videoFileFilter
            
        }).single('channel_video');

	 	 upload(req,res,function(err){
	 		if(err){
	 			res.status(500).json({
	 				status:false,
	 				error:err.message
	 			});
	 		}
	 		else{
	 			var id = req.body.id;
	 			var channel_video = req.file.path;

	 			channelModel.findOne({"_id":id})
	 			.then(data => {
	 				if(!data){
	 					res.status(200).json({
	 						status:false,
	 						message:"Sorry!create channel first"
	 					});
	 				}
	 				if(data){
	 					channelModel.findOneAndUpdate({"_id":id},
	 						{"channel_video":channel_video},
	 						{ new: true },
	 						function(err,data){
		 					if(err){
		 					return res.status(400).json({
		 							status:false,
		 							error:err,
		 							message:"error while uploading"
		 						});
		 					}
		 					else{
		 						res.status(200).json({
		 							status:true,
		 							message:"video updated successfully",
		 							data:req.file
		 						});
		 					}
	 					});
	 				}
	 			})
	 			.catch(err => {
	 				res.status(500).json({
	 					status:false,
	 					error:err.message
	 				});
	 			});
	 		}
	 	});
	 	
	},

	 /*
	     * Handle Put Request to add facebook of Channel owner.
	     * 1. Find Channel id And update Channel facebook network.
  	*/

	addFacebook(user,req,res,next){

        var profile_id = req.body.profile_id;
        var profile_url = req.body.profile_url;
        var access_token = req.body.access_token;
        var channel_id = req.body.channel_id;
	    var	facebook = {
						profile_id,
						profile_url,
						access_token,
						connect:true
					   }

		 channelModel.findOne({"user_id":user._id,"_id":channel_id})
				.then(data => {
					if(data){
						channelModel.update({"_id":channel_id},{facebook},function(err,data){
							if(err){
								res.status(500).json({
									status:false,
									error:err.message,
									message:"error while saving facebook connection"
								});
							}
							else{
								res.status(200).json({
									status:true,
									message:"facebook connection saved",
									data:data
								});
							}
						});
					}
					else{
						res.status(200).json({
							status:false,
							message:"Please create channel first"
						});
					}
				})
				.catch(err => {
					res.status(500).json({
						status:false,
						error:err.message
					});
				});
		
	},
	/*
	     * Handle Put Request to add twitter of Channel owner.
	     * 1. Find Channel id And update Channel twitter network.
  	*/

	addTwitter(user,req,res,next){
		var profile_id = req.body.profile_id;
        var profile_url = req.body.profile_url;
        var access_token = req.body.access_token;
        var channel_id = req.body.channel_id;

	    var	twitter = {
						profile_id,
						profile_url,
						access_token,
						connect:true
					   }

		 channelModel.findOne({"user_id":user._id,"_id":channel_id})
				.then(data => {
					if(data){
						channelModel.update({"_id":channel_id},{twitter},{ upsert:true },function(err,data){
							if(err){
								res.status(500).json({
									status:false,
									error:err.message,
									message:"error while saving twitter connection"
								});
							}
							else{
								res.status(200).json({
									status:true,
									message:"twitter connection saved",
									data:data
								});
							}
						});
					}
					else{
						res.status(200).json({
							status:false,
							message:"Please create channel first"
						});
					}
				})
				.catch(err => {
					res.status(500).json({
						status:false,
						error:err.message
					});
				});
	},
	/*
	     * Handle Put Request to add linkedin of Channel owner.
	     * 1. Find Channel id And update Channel linkedin network.
  	*/

	addLinkedin(user,req,res,next){
		var profile_id = req.body.profile_id;
        var profile_url = req.body.profile_url;
        var access_token = req.body.access_token;
        var channel_id = req.body.channel_id;

	    var	linkedin = {
						profile_id,
						profile_url,
						access_token,
						connect:true
					   }

		 channelModel.findOne({"user_id":user._id,"_id":channel_id})
				.then(data => {
					if(data){
						channelModel.update({"_id":channel_id},{linkedin},{ upsert:true },function(err,data){
							if(err){
								res.status(500).json({
									status:false,
									error:err.message,
									message:"error while saving linkedin connection"
								});
							}
							else{
								res.status(200).json({
									status:true,
									message:"linkedin connection saved",
									data:data
								});
							}
						});
					}
					else{
						res.status(200).json({
							status:false,
							message:"Please create channel first"
						});
					}
				})
				.catch(err => {
					res.status(400).json({
						status:false,
						error:err
					});
				});
	},

	/*
	     * Handle Put Request to add g+ of Channel owner.
	     * 1. Find Channel id And update Channel g+ network.
  	*/

	addGooglePlus(user,req,res,next){

		var profile_id = req.body.profile_id;
        var profile_url = req.body.profile_url;
        var access_token = req.body.access_token;
        var channel_id = req.body.channel_id;
	    var	google_plus = {
						profile_id,
						profile_url,
						access_token,
						connect:true
					   }

		 channelModel.findOne({"user_id":user._id,"_id":channel_id})
				.then(data => {
					if(data){
						channelModel.update({"_id":channel_id},{google_plus},function(err,data){
							if(err){
								res.status(500).json({
									status:false,
									error:err,
									message:"error while saving google_plus connection"
								});
							}
							else{
								res.status(200).json({
									status:true,
									message:"google_plus connection saved",
									data:data
								});
							}
						});
					}
					else{
						res.status(200).json({
							status:false,
							message:"Please create channel first"
						});
					}
				})
				.catch(err => {
					res.status(500).json({
						status:false,
						error:err.message
					});
				});
	},
	/*
	     * Handle Put Request to add g+ of Channel owner.
	     * 1. Find Channel id And update Channel g+ network.
  	*/

	getAllChannels(user,req,res,next){

		var user_id = user._id;


   channelModel.find({user_id})

		.then(data => {
			if(data.length){
				res.status(200).json({
					status:true,
					message:"Your created channel list",
					data:data
				});
			}
				else{
					res.status(200).json({
						status:false,
						message:"Sorry you have not created any channel yet"
					});
				}
		})
		.catch(err => {
			res.status(500).json({
				status:false,
				error:err.message
			});
		});
	},

	/*
	  Controller function to handle get request to fetch channel details
	*/


	aboutChannel(user,req,res,next){

		var user = user._id;
		var channel_id = req.params.id;	

		channelModel.findOne({"_id":channel_id})
		.populate({
                path: 'subscribed_by',
                model: 'subscriber',
                select:"user_id",
                populate: {
                 path: 'user_id',
                 select:"email"
               }            
             })
		.populate({
                path: 'subscribed_by',
                model: 'subscriber',
                select:'channel_id',
                populate: {
                 path: 'channel_id',
                 select:"channelTitle"
               }
             })
		.then(docs => {
			if(docs){
                       
				res.status(200).json({
					status:true,
					messsage:"Channel details are",
					data:docs
				});
			}
			else{
				res.status(404).json({
					status:false,
					message:"Please send a valid channel id"
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				status:false,
				error:err.message
			});
		});
	},

	//Controller function to fetch video articles posted on channel

	videoContent(user,req,res,next){

		var user = user._id;
		var channel_id = req.params.id;

		Article.find({"published_channel":channel_id})
		.then(docs => {
			if(docs.length){
				Article.find({"content_type":'video'})
				.then(data => {
					if(data.length){
						res.status(200).json({
							status:true,
							message:"video data posted on this channel ",
							data:data
						});
					}
					else{
						res.status(404).json({
							status:false,
							message:"No video article has been posted on this channel yet"
						});
					}
				})
				.catch(err => {
					res.status(500).json({
						status:false,
						error:err.message
					});
				});
			}
			else{
				res.status(409).json({
					status:false,
					message:"Send valid channel id"
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				status:false,
				error:err.message
			});
		});
	},

	//controller article to fetch the image article posted on channel

	imageContent(user,req,res,next){

		var user = user._id;
		var channel_id = req.params.id;

		Article.find({"published_channel":channel_id})
		.then(docs => {
			if(docs.length){
				Article.find({"content_type":'image'})
				.then(data => {
					if(data.length){
						res.status(200).json({
							status:true,
							message:"image data posted on this channel ",
							data:data
						});
					}
					else{
						res.status(404).json({
							status:false,
							message:"No image article has been posted on this channel yet"
						});
					}
				});
			}
			else{
				res.status(409).json({
					status:false,
					message:"Send valid channel id"
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				status:false,
				error:err.message
			});
		});
	},

	//controller function to fetch mixed articles posted on this channel

	mixedArticleContent(user,req,res,next){

		var user = user._id;
		var channel_id = req.params.id;

		Article.find({"published_channel":channel_id})
		.then(docs => {
			if(docs.length){
				Article.find({"content_type":'mixedArticle'})
				.then(data => {
					if(data.length){
						res.status(200).json({
							status:true,
							message:"mixedArticle  posted on this channel",
							data:data
						});
					}
					else{
						res.status(404).json({
							status:false,
							message:"No mixed article has been posted on this channel yet"
						});
					}
				});			
			}
			else{
				res.status(409).json({
					status:false,
					message:"Send valid channel id"
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				status:false,
				error:err.message
			});
		});
	}
}

import mongoose from 'mongoose';
import channelModel from '../models/channelModel';
import { storage, imageFileFilter, videoFileFilter } from '../config/fileUpload';
import multer from 'multer';


module.exports = {

	deleteCoverpic(user,req,res,next){

		 var user = user._id;
		 var id   = req.params.id;
		
		channelModel.findById({"_id":id})
		.then(data => {
			if(data){
				if(data.cover_image){
					channelModel.update({"_id":id},{$unset: {cover_image:1}},function(err,output){
						if(err){
							res.status(500).json({
								status:false,
								message:"error while deleting",
								error:err.message
							});
						}
						else{
							res.status(200).json({
								status:true,
								message:"Cover image deleted successfully"
							});
						}
					});
				}
				else{
					res.status(200).json({
						status:false,
						message:"Sorry you don't have any cover image to delete"
					});
				}
				
			}
			else{
				res.status(200).json({
					status:false,
					message:"No channel found"
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
	     * Handle Put Request  to delete the Channel Logo.
	     * 1. Find Channel id And delete Channel Logo.
  	*/

	deletelogo(user,req,res,next){

		 var user = user._id;
		 var id   = req.params.id;
		
		channelModel.findById({"_id":id})
		.then(data => {
			if(data){
				if(data.logo){
					channelModel.update({"_id":id},{$unset: {logo:1}},function(err,output){
						if(err){
							res.status(500).json({
								status:false,
								message:"error while deleting avatar",
								error:err.message
							});
						}
						else{
							res.status(200).json({
								status:true,
								message:"Avatar deleted successfully"
							});
						}
					});
				}
				else{
					res.status(200).json({
						status:false,
						message:"You have no avatar to delete"
					});
				}
				
			}
			else{
				res.status(200).json({
					status:false,
					message:"No channel found"
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
	     * Handle Put Request  to delete the Channel Logo.
	     * 1. Find Channel id And delete Channel Logo.
  	*/

	deleteVideo(user,req,res,next){

		 var user = user._id;
		 var id   = req.params.id;
		
		channelModel.findById({"_id":id})
		.then(data => {
			if(data){
				if(data.logo){
					channelModel.update({"_id":id},{$unset: {channel_video:1}},function(err,output){
						if(err){
							res.status(500).json({
								status:false,
								message:"error while deleting video",
								error:err.message
							});
						}
						else{
							res.status(200).json({
								status:true,
								message:"Video deleted successfully"
							});
						}
					});
				}
				else{
					res.status(200).json({
						status:false,
						message:"You have no video to delete"
					});
				}
				
			}
			else{
				res.status(200).json({
					status:false,
					message:"No channel found"
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
	     * Handle Put Request the Channel info.
	     * 1. Find Channel id And update Channel info.
  	*/
	editChannel(user,req,res,next){
		var user               = user._id;
		var channelId          = req.body.channelId;
		var channelTitle       = req.body.channelTitle;
		var channelDescription = req.body.channelDescription;

		channelModel.findOne({"user":user})
		.then(data => {
			if(data){
				channelModel.findOneAndUpdate({"_id":channelId},{channelTitle,channelDescription},function(err,data){
					if(err){
						res.status(500).json({
							status:false,
							error:err.message,
							message:"error while updating"
						});
					}
					else{
						res.status(200).json({
							status:true,
							message:"ChannelInfo updated successfully",
							data:data
						});
					}
				});
			}
				else{
					res.status(200).json({
						status:false,
						message:"No channel found"
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
	     * Handle Put Request to delete twitter connection 
	     * 1. Find user id And delete twitter account info.
  	*/

	removeTwitter(user,req,res,next){
		var user = user._id;
		var channelid = req.body.id;
		
		channelModel.findOne({"user":user,"_id":channelid})
		.then(data => {
			if(data){
				if(data.twitter.connection){
					channelModel.update({"_id":channelid},{$unset: {twitter:1}},function(err,output){
						if(err){
							res.status(500).json({
								status:false,
								message:"error while disconnecting to twitter",
								error:err.message
							});
						}
						else{
							res.status(200).json({
								status:true,
								message:"twitter connection disconnected successfully"
							});
						}
					});
				}
				else{
					res.status(200).json({
						status:false,
						message:"Sorry you don't have any twitter connection to disconnect"
					});
				}
				
			}
			else{
				res.status(200).json({
					status:false,
					message:"No channel found"
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
	     * Handle Put Request to delete linkedin connection 
	     * 1. Find user id And delete linkedin account info.
  	*/

	removeLinkedin(user,req,res,next){
		var user = user._id;
		var channelid = req.body.id;
		
		channelModel.findOne({"_id":channelid})
		.then(data => {
			if(data){
				if(data.linkedin.connection){
					channelModel.update({"_id":channelid},{$unset: {linkedin:1}},function(err,output){
						if(err){
							res.status(500).json({
								status:false,
								message:"error while disconnecting to linkedin",
								error:err.message
							});
						}
						else{
							res.status(200).json({
								status:true,
								message:"linkedin connection disconnected successfully"
							});
						}
					});
				}
				else{
					res.status(200).json({
						status:false,
						message:"Sorry you don't have any linkedin connection to disconnect"
					});
				}
				
			}
			else{
				res.status(200).json({
					status:false,
					message:"No channel found"
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
	     * Handle Put Request to delete facebook connection 
	     * 1. Find user id And delete facebook account info.
  	*/

	removeFacebook(user,req,res,next){
		var user = user._id;
		var channelid = req.body.id;
		
		channelModel.findOne({"_id":channelid})
		.then(data => {
			if(data){
				if(data.facebook.connection){
					channelModel.update({"_id":channelid},{$unset: {facebook:1}},function(err,output){
						if(err){
							res.status(500).json({
								status:false,
								message:"error while disconnecting to facebook",
								error:err.message
							});
						}
						else{
							res.status(200).json({
								status:true,
								message:"Facebook connection disconnected successfully"
							});
						}
					});
				}
				else{
					res.status(200).json({
						status:false,
						message:"Sorry you don't have any facebook connection to disconnect"
					});
				}
				
			}
			else{
				res.status(200).json({
					status:false,
					message:"No channel found"
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
	     * Handle Put Request to delete g+ connection 
	     * 1. Find user id And delete g+ account info.
  	*/

	removeGooglePlus(user,req,res,next){
		var user = user._id;
		var channelid = req.body.id;

		channelModel.findOne({"user":user,"_id":channelid})
		.then(data => {
			if(data){
				if(data.google_plus.connection){
					channelModel.update({"_id":channelid},{$unset: {google_plus:1}},function(err,affected){
						if(err){
							res.status(500).json({
								status:false,
								message:"error while removing  google connection",
								error:err.message
							});
						}
						else{
							res.status(200).json({
								status:true,
								message:"Google plus connection disconnected"
							});
						}
					});
				}
					else{
						res.status(200).json({
							status:false,
							message:"You are already disconnected to google plus"
						});
					}
			}
				else{
					res.status(200).json({
						status:false,
						message:"Create channel first"
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
import YouTube from 'youtube-node';
import Vimeo from 'vimeo';



module.exports = {

	/**
     * Handle search video Request 
     * 1.Get the searchText and check on youtube and vimeo.
     **/

	searchVideo(user,req,res,next){
		var user          = user._id;
		var body          = req.body;
		var searchText    = req.body.searchText;

		// setting credentials for vimeo

		var Vimeo              = require('vimeo').Vimeo;
		var vimeoClient_id     = '5b4807e00678a3476c14148ef02b2472662ff457';
		var vimeoClient_secret = 'g4uqxKIkhiDgareai7Ih9Abl3rTmI8G2e7tEvAyAAhbf9FQz+amTuDd9SXD92N0VSsb4Eqz6tTXKTT9B28gKvhDvbnpwTMzJlUwEiTACqdJg7BtATmdSQxyz+J+oT7qD';
		var vimeoAccess_token  = '9145efccfa8134b80d8c7366eb4fcac9';
		var lib                = new Vimeo(vimeoClient_id, vimeoClient_secret);
		
		//creating an object for wrapping data from different sites
		var videoData     = {};

		//creating instance of youtube
		var youTube = new YouTube();

		//setting credential for youtube
		youTube.setKey('AIzaSyDyzeXvk4Ms1O9oA1y4w0KwLfbspjQeTBI');

		/*
			Fetching video data from youtube
		*/
		youTube.search(searchText,5,function(error, result) {
 		 	if (error) {
    			res.status(409).json({
    				status:false,
    				message:"Error while fetching from Youtube",
    				Error:error.message
    			});
  			}
  			else {
    			videoData['youtube'] = result;
  			}
		});

		/*
			Fetching video data from vimeo
		*/ 

    	lib.generateClientCredentials('public', function (error, access_token) {
        	 if (error) {
               res.status(409).json({
               	status:false,
               	Error:error
               });
           } 
        	var token = access_token.access_token;
        	var scopes = access_token.scope;
   		});
   		lib.request({
           method:"GET",
           path : '/videos',
           query : {
               page : 1,
               per_page : 10,
               query:searchText
           }
       },function (error, body, status_code, headers) {
           if (error) {
               res.status(409).json({
               	status:false,
               	Error:error
               });
           } 
           else{
               videoData['vimeo'] = body.data;
               res.status(200).json({
               	status:true,
               	data:videoData
               });
               
           }
       });
   	}
}

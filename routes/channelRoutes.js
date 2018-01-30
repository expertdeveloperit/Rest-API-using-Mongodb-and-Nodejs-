import express from 'express';
import ensureAuth from '../config/ensure-authenticated';
import channelController from '../controllers/channelController';
import passport from 'passport';
import channelShowcaseController  from '../controllers/channelShowcaseController';


//creating router instance ofexpress router
const router = express.Router();

/*
 Creating routes to
   ** Create channel
   ** Add team
   ** Add logo and cover image,video of channel
   ** Fetching Channel info
   ** handles routes to get channels all associated with the user
   ** Adding channels social accoounts
   ** Fetching all posts on channel
*/


/*
  Route to create new channel
*/
router.route('/newchannel')
      .post(
          ensureAuth.authenticate,
          channelController.createChannel
      )
/*
   Route to create team
    */
router.route('/addteam')
      .post(
          ensureAuth.authenticate,
          channelController.addTeam
      )


/*
Route to add channel image
*/
router.route('/channellogo')
      .put(
          ensureAuth.authenticate,
          channelController.addLogo
      )

/*
    Route to add channel cover image
  */

router.route('/channelCover')
      .put(
          ensureAuth.authenticate,
          channelController.addCoverimage
      )

/*
  Route to add channel video
*/

router.route('/channelVideo')
      .put(
          ensureAuth.authenticate,
          channelController.addVideo
      )


 /*
    Route to get all channels info
  */

router.route('/channels')
      .get(
          ensureAuth.authenticate,
          channelController.getAllChannels
        )

 /*
    Route to add facebok connection
  */

 router.route('/channel/facebook')
       .put(
          ensureAuth.authenticate,
          channelController.addFacebook
        )

 /*
    Route to add twitter connection
  */
router.route('/channel/twitter')
      .put(
          ensureAuth.authenticate,
          channelController.addTwitter
      )


/*
    Route to add linkedin connection
  */
router.route('/channel/linkedin')
      .put(
          ensureAuth.authenticate,
          channelController.addLinkedin
      )


/*
    Route to add addGooglePlus connection
  */
router.route('/channel/googlePlus')
      .put(
          ensureAuth.authenticate,
          channelController.addGooglePlus
      )

 /*
 Route to fetch all article posts posted on channel
*/

 router.route('/allposts/:published_channel/:pagenumber')
       .get(
         ensureAuth.authenticate,
         channelShowcaseController.allPosts
         )

 /*
 Route to fetch all details about channel
*/

 router.route('/channeldetails/:id')
       .get(
         ensureAuth.authenticate,
         channelController.aboutChannel
         )

/*
 Route to fetch all video articles of channel
*/

 router.route('/channelcontent/video/:id')
       .get(
         ensureAuth.authenticate,
         channelController.videoContent
         )


/*
 Route to fetch all image articles of channel
*/

 router.route('/channelcontent/image/:id')
       .get(
         ensureAuth.authenticate,
         channelController.imageContent
         )


/*
 Route to fetch all image articles of channel
*/

 router.route('/channelcontent/mixedArticle/:id')
       .get(
         ensureAuth.authenticate,
         channelController.mixedArticleContent
         )


/*
 Route to hande subscribe request of channel
*/

 router.route('/channel/subscribe')
       .post(
         ensureAuth.authenticate,
         channelShowcaseController.addSubscribers
         )

/*
  Route to get all subscribers of channel
*/

 router.route('/subscribers/:id')
       .get(
         channelShowcaseController.allSubscribers
         )


/*
  Route to get single channel publicaly 
*/

 router.route('/channel/:id')
       .get(
         channelShowcaseController.singleChannel
         )





module.exports = router;
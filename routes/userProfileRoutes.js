import express from 'express';
import ensureAuth from '../config/ensure-authenticated';
import userProfileController from '../controllers/userProfileController';



// creating router instance of express router
const router = express.Router();

/* 
  Routes to handle User Profile requests
*/

/*
 * Route to create user Profile 
 * Route to get profile api
 */
router.route('/profile')
    .get(
        ensureAuth.authenticate,
        userProfileController.getProfile
    )
    .post(
        ensureAuth.authenticate,
        userProfileController.createUpdateProfile
    )
/* 
  Route to upload user profile picture
 */
router.route('/upload/profilePicture')
    .put(
        ensureAuth.authenticate,
        userProfileController.profilePicture
    )

/* 
  Route to upload user profile picture
 */
router.route('/upload/coverPicture')

    .put(
        ensureAuth.authenticate,
        userProfileController.profileCoverPicture
    )

/* 
  Route to get user likes
*/
router.route('/userlikes')
    .get(
        ensureAuth.authenticate,
        userProfileController.getLikes)
    .post(
        ensureAuth.authenticate,
        userProfileController.addLikes
    )


/* 
  Route to get user feeds
*/
router.route('/feeds')
    .get(
        ensureAuth.authenticate,
        userProfileController.getFeeds
        )



module.exports = router;
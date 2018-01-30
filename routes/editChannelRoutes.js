import express from 'express';
import ensureAuth from '../config/ensure-authenticated';
import editChannelController from '../controllers/editChannelController';


//creating instance of express Router
	var router = express.Router();


	/*
		Routes to handle request to edit channel
	*/

	//Route to update channelInfo
	router.route('/updatechannel')
	.put(
		ensureAuth.authenticate,
		editChannelController.editChannel
		)

	//Route to delete logo of channel
	router.route('/deletelogo/:id')
	.put( 
		ensureAuth.authenticate,
		editChannelController.deletelogo
		)

	//Route to delete cover image of channel
	router.route('/deletecover/:id')
	.put(
		ensureAuth.authenticate,
		editChannelController.deleteCoverpic
		)

	//Route to delete video of channel
	router.route('/deletevideo/:id')
	.put(
		ensureAuth.authenticate,
		editChannelController.deleteVideo
		)

	//Route to delete facebook connection
	router.route('/disconnectfb')
		.put(
			ensureAuth.authenticate,
			editChannelController.removeFacebook
			)

		//Route to delete twitter connection
	router.route('/disconnecttwitter')
		.put(
			ensureAuth.authenticate,
			editChannelController.removeTwitter
			)

		//Route to delete g+ connection
	router.route('/disconnectgplus')
		.put(
			ensureAuth.authenticate,
			editChannelController.removeGooglePlus
			)

		//Route to delete linkedin connection
	router.route('/disconnectlinkedin')
		.put(
			ensureAuth.authenticate,
			editChannelController.removeLinkedin
			)


	module.exports = router;
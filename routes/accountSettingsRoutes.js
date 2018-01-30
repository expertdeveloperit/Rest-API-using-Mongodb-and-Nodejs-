import express from 'express';
import accountSettingController  from '../controllers/accountSettingController';

import ensureAuth from '../config/ensure-authenticated';

// Creating router instance of express
	const router = express.Router() ;

/* 
	Route to manage user's account settings
*/


// Route to change password for user's account

router.route('/settings/change_password')
	  .put(
	  	    ensureAuth.authenticate,
		    accountSettingController.changePassword
		   );

// Route to delete user's account
router.route('/settings/remove_account')
	  .delete(
	  	     ensureAuth.authenticate,
		     accountSettingController.deleteAccount
		    );

 // Route to delete user's account
router.route('/settings/update_account')
	  .put(
	  	   ensureAuth.authenticate,
		   accountSettingController.updateAccount
		  );




module.exports = router;
import express from 'express';
import ensureAuth from '../config/ensure-authenticated';
import bank from '../controllers/bankAccountController';

//creating router instance of express router
 const router = express.Router();

 /*
	Routes to handle bank Account requests
 */

 /* 
 	 Route to get bank account
  */
 	router.route('/bank_account')
 	 	.get(
 		ensureAuth.authenticate,
 		bank.getAccount
 		)

  /* 
 	 Route to add bank account
 */
 	router.route('/add/bank_account')
 	 	.post(
 		ensureAuth.authenticate,
 		bank.addAccount
 		)

  /* 
 	 Route to add bank account
  */
 	router.route('/remove/bank_account/:id')
 	 	.delete(
 		ensureAuth.authenticate,
 		bank.deleteAccount
 		)








 module.exports = router;

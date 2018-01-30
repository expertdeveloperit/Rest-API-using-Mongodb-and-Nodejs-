import express from 'express';
import ensureAuth from '../config/ensure-authenticated';
import creditCard from '../controllers/creditCardController';


//creating router instance of express router
const router = express.Router();


/*
	creating Routes to handle credit card data
*/

   //Route to save credit card details
    	router.route('/add/credit_card')
            .post(
            	  ensureAuth.authenticate,
            	  creditCard.addCard
            	)


    //Route to delete credit card details
    	router.route('/remove/credit_card/:id')
    		.delete(
    			ensureAuth.authenticate,
    			creditCard.deleteCard
    			)

    //Route to get all card data
    	router.route('/credit_card')
    		.get(
    			ensureAuth.authenticate,
    			creditCard.getCard
    			)



 module.exports = router;
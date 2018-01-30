import card from '../models/creditCardModel';
import validations      from '../helpers/userHelper';

module.exports = {
	getCard(user,req,res,next){
		var user = user._id;

		card.find({"user":user})
		.then(data => {
			if(!data.length){
				res.status(200).json({
					status:false,
					message:"You don't have any saved cards"
				});
			}
			if(data.length){
				res.status(200).json({
					status:true,
					message:"Your saved cards",
					data:data
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
	deleteCard(user,req,res,next){
		var user = user._id;
		var card_id = req.params.id;

		card.findOne({"user":user})
		.then(data => {
			if(!data){
				res.status(200).json({
					status:true,
					message:"No card available to delete"
				});
			}
			if(data){
				card.findOneAndRemove({"_id":card_id},function(err,data){
					if(err){
						res.status(500).json({
							status:false,
							error:err.message
						});
					}
					if(!data){
						res.status(200).json({
							status:false,
							message:"Deletion failed!No card with this id exists"
						});
					}
					else{
						res.status(200).json({
							status:true,
							message:"Deletion successful"
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
	},
	addCard(user,req,res,next){
		var user       = user._id;
		var cardHolder = req.body.cardHolder;
		var card_num   = req.body.card_num;
		var expiration_date = req.body.expiration_date;

		var newCard = new card({
			user,
			cardHolder,
			card_num,
			expiration_date
		});

		if(validations.creditCardvalidation(card_num) ==!true){
			res.status(400).json({
				status:false,
				message:"Card number cannot be empty & should be in valid format"
			});
		}
		else{
			newCard.save()
			.then(data => {
				res.status(200).json({
					status:true,
					message:"Card saved successfully"
				});
			})
			.catch(err => {
				res.status(500).json({
					status:false,
					error:err.message
				});
			});
		}
	}
}
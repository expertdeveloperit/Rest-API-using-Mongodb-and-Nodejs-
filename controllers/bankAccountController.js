import bankAccount from '../models/bankAccountsModel';
import validations      from '../helpers/accountHelper';



module.exports = {
	addAccount(user,req,res,next){
		var user      = user._id;
		var username  = req.body.username;
		var swiftCode = req.body.swiftCode;
		var bankName  = req.body.bankName;
		var IBAN_num  = req.body.IBAN_num;

		var newAccount = new bankAccount({
			user,
			username,
			swiftCode,
			bankName,
			IBAN_num
		});

		if (validations.swiftCodeValidation(swiftCode) ==! true){
			res.status(400).json({
				status:false,
				message:"Swift code cannot be empty & should be in valid format"
			});
		}
		if(validations.IBANvalidation(IBAN_num) ==!true){
			res.status(400).json({
				status:false,
				message:"IBAN cannot be empty & should be in valid format"
			})
		}

		else{
			newAccount.save(function(err,data){
				if(err){
					res.status(422).json({
						status:false,
						Error:err,
						message:"Sorry!This detail cannot be saved"
					});
				}
				else{
					res.status(200).json({
						status:true,
						message:"Account saved successfully",
						data:data
					});
				}
			});
		}
	},
	deleteAccount(user,req,res,next){
		var user = user._id;
		var account = req.params.id;

		bankAccount.findOne({"user":user})
		.then(data => {
			if(!data){
				res.status(200).json({
					status:false,
					message:"Ouch!No bank account for this user exists"
				});
			}
			if(data){
				bankAccount.findOneAndRemove({"_id":account},function(err,data){
					if(err){
						res.status(400).json({
							status:false,
							Error:err
						});
					}
					if(!data){
						res.status(200).json({
							status:false,
							message:"Aw Snap!This data doesnot exists"
						});
					}
					else{
						res.status(200).json({
							status:true,
							message:"Deletion successful!"
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
	getAccount(user,req,res,next){
		var user = user._id;

		bankAccount.find({"user":user})
		.then(data => {
			if(data.length){
				res.status(200).json({
					status:true,
					message:"Your saved accounts are ->",
					data:data
				});
			}
			if(!data.length){
				res.status(200).json({
					status:false,
					message:"Ohhh!You don't have any save bank accounts"
				});
			}
		})
		.catch(err => {
			res.status(400).json({
				status:false,
				Error:err
			});
		});
	}
}
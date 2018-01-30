import mongoose from 'mongoose';


const creditCardSchema = mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:true
	},
	cardHolder:{
		type:String,
		required:true
	},
	card_num:{
		type:String,
		required:true
	},
	expiration_date:{
		type:String,
		required:true
	}
});


const creditCard = mongoose.model('creditCard',creditCardSchema);



export default creditCard;
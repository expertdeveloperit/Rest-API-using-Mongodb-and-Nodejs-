import mongoose from 'mongoose';

const bankDetailSchema = mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:true
	},
	username:{
		type:String,
		required:true
	},
	swiftCode:{
		type:String,
		required:true
	},
	bankName:{
		type:String,
		required:true
	},
	IBAN_num:{
		type:String,
		unique:true
	}
});

const bank = mongoose.model('bank',bankDetailSchema);

export default bank;
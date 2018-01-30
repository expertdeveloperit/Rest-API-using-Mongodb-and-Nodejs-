import mongoose from 'mongoose';

const campaignSchema = mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:true
	},
	channel_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Channel',
		required:true
	},
	campaignVideo:{
		type:String
	},
	campaignImages:{
		type:String
	}
});

const campaignDetails = mongoose.model('campaignDetails',campaignSchema);

module.exports = campaignDetails;
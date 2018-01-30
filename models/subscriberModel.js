import mongoose from 'mongoose';
import ChannelModel from './channelModel';
import UserModel from './userModel';

const subscriberSchema = mongoose.Schema({
	user_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:true
	},
	subscribed_on:{
		type:Date,
		default: Date.now()
	},
	channel_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Channel',
		required:true
	}

});

subscriberSchema.post('save', ({_id,channel_id,user_id}, next) => {
   ChannelModel.findOne({ _id: channel_id })
     .exec()
     .then(doc => {
     	
       return doc.update({ $addToSet: { subscribed_by: _id } })
     }).catch(err => console.error(err))
 next()
});



const subscriber = mongoose.model('subscriber',subscriberSchema);

module.exports = subscriber;
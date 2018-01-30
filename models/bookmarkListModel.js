import mongoose from 'mongoose';
import userModel from './userModel';

const bookmarkListSchema = mongoose.Schema({
    user_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:true
	},
	list_name:{
		type:String,
		required:true,		
	},
	list_description:{
		type:String,
		required:true
	},
	list_bookmarks:[
	   {
	     article_id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'article',
			required:true
		 },
		 channel_id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'Channel',
			required:true
		 }
	  }
	],
	created_on:{
		type:Date,
		default: Date.now()
	}	

});

bookmarkListSchema.post('save', ({_id,user_id}, next) => {
   userModel.findOne({ _id: user_id })
     .exec()
     .then(doc => {   

       return doc.update({ $addToSet: { bookmark_lists: _id } })
     }).catch(err => console.error(err))
 next()
})

const bookmarkList = mongoose.model('bookmarkList',bookmarkListSchema);

module.exports = bookmarkList;
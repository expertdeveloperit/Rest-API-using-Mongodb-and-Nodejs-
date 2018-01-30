import mongoose from 'mongoose';
import ArticleModel from './articleModel';

const likesSchema = mongoose.Schema({
	user_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:true
	},
	liked_on:{
		type:Date,
		default: Date.now()
	},
	article_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'article',
		required:true
	}

});

likesSchema.post('save', ({_id,article_id,user_id}, next) => {
   ArticleModel.findOne({ _id: article_id })
     .exec()
     .then(doc => {
     	
       return doc.update({ $addToSet: { liked_by: user_id } })
     }).catch(err => console.error(err))
 next()
})

const Likes = mongoose.model('Likes',likesSchema);

module.exports = Likes;
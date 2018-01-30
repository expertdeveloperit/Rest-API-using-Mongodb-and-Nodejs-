import mongoose from 'mongoose';
import ArticleModel from './articleModel';

const commentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    published_time: {
        type: Date,
        default: Date.now()
    },
    article_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article',
        required: true
    },
    comment: {
        type: String,
        default: "",
        required: true
    }

});


commentSchema.post('save', ({_id,article_id, user_id}, next) => {
    ArticleModel.findOne({_id: article_id})
        .exec()
        .then(doc => {

            return doc.update({
                $addToSet: {
                    comments: _id
                }
            })
        }).catch(err => console.error(err))
    next()
})


const comment = mongoose.model('comment', commentSchema);

module.exports = comment;

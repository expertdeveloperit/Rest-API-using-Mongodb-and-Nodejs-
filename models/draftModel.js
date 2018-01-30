import mongoose from 'mongoose';
import channelModel from './channelModel';

const draftSchema = new mongoose.Schema({
    draft_title:{
		type:String,
		required:true,
		unique:true,
		default:''
	},
    main_title:{
        type:String,
    	required:true,
    },
    quick_category_title:{
    	type:String,
    	//required:true
    },
    quick_category_icon:{
        type:String,
    	//required:true
    },
    content_type:{
    	type:String,
    	//required:true
    },
    article_data:[],
	created_by:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	published_channel:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Channel',		
	},
	creation_time:{
		type:Date,
	    default:Date.now() 
	}
	

},);


const draft = mongoose.model('draft', draftSchema);

module.exports = draft;


import mongoose from 'mongoose';
import channelModel from './channelModel';

const articleSchema = new mongoose.Schema({

    main_title:{
        type:String,
    	required:true,
    	unique:true
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
    likes:{
		type:Number,
		default:0
	},
	liked_by: [
	  { 
		type: mongoose.Schema.Types.ObjectId,
		 ref: 'User',
		 default: [] 
		}
	],
	comments:[
	   { 
		type: mongoose.Schema.Types.ObjectId,
		 ref: 'comment',
		 default: [] 
		}
	],	
	trend_graph:{
		type:Number,
		default:0
	},
	published_by:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	published_channel:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Channel',
		
	},
	published_time:{
		type:Date,
	    default:Date.now() 
	}


},);


const article = mongoose.model('article', articleSchema);

module.exports = article;


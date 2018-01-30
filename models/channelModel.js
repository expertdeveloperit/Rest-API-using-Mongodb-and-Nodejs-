import mongoose from 'mongoose';


const channelSchema = mongoose.Schema({
	user_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:true
	},
	channelTitle:{
		type:String,
		unique: true,
		required:true
	},
	channelDescription:{
		type:String
	},
	cover_image:{
		type:String
	},
	logo:{
		type:String
	},
	thumbnail:{
		type:String
	},
	channel_video:{
		type:String
	},
	team:[
	   { 
		type: mongoose.Schema.Types.ObjectId,
		 ref: 'channelTeam',
		 default: [] 
		}
	],
	facebook:{
		
    connect:{ type:Boolean, default:false },
	profile_id:String,
	profile_url:String,
	access_token:String
		
	},
	twitter:{

	connect:{ type:Boolean, default:false },
	profile_id:String,
	profile_url:String,
	access_token:String	
		
	},
	linkedin:{
		
    connect:{ type:Boolean, default:false },
	profile_id:String,
	profile_url:String,
	access_token:String
		
	},
	google_plus:{
		
	connect:{ type:Boolean, default:false },
	profile_id:String,
	profile_url:String,
	access_token:String		
		
	},	
	articles:[
	   { 
	   	type:mongoose.Schema.Types.ObjectId,
	   	ref:"article",
	   	required:true
	   }
	],
    subscribers:{
    	type:Number,
    	default:0
    },
    views:{
    	type:Number,
    	default:0
    },
	subscribed_by:[
	   { 
		type: mongoose.Schema.Types.ObjectId,
		 ref: 'subscriber',
		 default: [] 
		}
	]
	
 });

const Channel = mongoose.model('Channel',channelSchema);


module.exports = Channel;
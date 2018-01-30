import mongoose from 'mongoose';
import Channel from './channelModel'

const teamSchema = mongoose.Schema({
	user_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:true
	},
	channel:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Channel',
		required:true
	},
	member_name:[
	    {    
	        member_id:{ type:String, required:true},
	    	member_name:{ type:String, required:true},
	    }
    ],
	shares:{
		type:Number,
		required:true
	},
	since:{
		type:Date,
		default:Date.now()
	}
});



teamSchema.post('save',({_id,user,channel},next)=> {
	Channel.findOne({"_id":channel})
	.exec()
	.then(doc => {
		return doc.update({
                $addToSet: {
                    team: _id
                }
            })
	}).catch(err => {console.log(err)});
	next()
});


const channelTeam = mongoose.model('channelTeam',teamSchema);


module.exports =  channelTeam;
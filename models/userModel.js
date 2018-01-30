import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  name: {
    type: String    
  },
  surname:{
     type: String    
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  email_verify_token:{
    type:String,
  },
  email_verified:{
    type:Boolean,
    default:false
  },
  password: {
    type: String,
    required: true
  },
  reset_password_token:{
    type: String
  },
  reset_password_expires:{
    type: String
  },  
  about: {
    type: String 
  },
  profile_picture:{
    type:String    
  },
  profile_cover_picture:{
    type:String 
  },
  social_links:{
     facebook:{
         type:String,    
     },
     twitter:{
        type:String,  
     },
     googlePlus:{
        type:String
     },
     linkedin:{
        type:String
     }
  },
  feeds:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Channel",
      required:true
    }
  ],
  bookmark_lists:[
     { 
      type:mongoose.Schema.Types.ObjectId,
      ref:'bookmarkList',
      required:true
     }
  ],
  show_like_publicly:{
    type:Boolean,
    default:true
  }  
},
 {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;

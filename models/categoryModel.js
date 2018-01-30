import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
 
  title:{
    type:String,
    default:''
  },
  category_icon:{
    type:String,
    default:''
  }
  
 });

const category = mongoose.model('category', categorySchema);

module.exports = category;

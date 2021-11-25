const Mongoose=require('mongoose');
const Schema=Mongoose.Schema;
const TextSchema=new Schema({
   title:String,
   information:String

})
 


module.exports=Mongoose.model('Text',TextSchema)


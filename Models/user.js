const Mongoose=require('mongoose');
const Schema=Mongoose.Schema;
const userSchema=new Schema({
  userName:String,
  email:String,
  password:String,
  repeatPassword:String,
  department:String,
  resetToken:String,
  resetTokenExpiration:Date,
  type:String

})
 


module.exports=Mongoose.model('user',userSchema)


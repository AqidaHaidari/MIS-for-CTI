const Mongoose=require('mongoose');
const Schema=Mongoose.Schema;
const StudentSchema=new Schema({
    name:String,
    lname:String,
    fname:String,
    email:String,
    phone:Number,
    nationalId:Number,
    address:String,
    dateOfBirth:String,
    classId:{
        type:Schema.Types.ObjectId,
        ref:"department"
    },
    major:String,
    photo:String,
    other:String,
    dateOfRegistration:String,
    score:Number,
    dateOfExpire:Date,
    dateOfIssue:Date,
    status:String,
    nativeScore:Number,
    deleted:Number,
    result:String,
    description:String,
    registerToClass:String,
    studentId:String,
    cardNumber:Number,
    studentDp:String,
    studentYear:String



})



module.exports=Mongoose.model('Student',StudentSchema)


const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const attendanceSchema = new Schema({
    studentId:{
        type:Schema.Types.ObjectId,
        ref:"Student"
    },
    date:String,
    comment:String,
    attendence:String,
    have:Number
})

module.exports = Mongoose.model("attendance", attendanceSchema)
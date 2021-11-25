const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const classSchema = new Schema({
    depname: String,
    time:String,
    day:String,
    name:String,
    year:String,
    month: String,
    attendence:Number,
    deleted:Number
})

module.exports = Mongoose.model("class", classSchema)
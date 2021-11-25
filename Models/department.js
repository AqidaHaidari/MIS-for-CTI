const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const departmentSchema = new Schema({
    depname: String,
   
})

module.exports = Mongoose.model("department", departmentSchema)
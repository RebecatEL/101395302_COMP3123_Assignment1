const mongoose = require('mongoose')

// Create Schema
const empSchema = new mongoose.Schema({
    // id is auto-generated and added by mongoose
    first_name:{
        type: String,
        maxlength: 100,
        required: true
    },
    last_name:{
        type: String,
        maxlength: 50,
        required: true
    },
    email:{
        type: String,
        maxlength: 50,
        unique: true
    },
    gender:{
        type: String,
        maxlength: 25,
        enum:['Male','Female','Other']
    },
    salary:{
        type: Number,
        required: true
    }
})

// Create model and export it
module.exports = mongoose.model("Employee", empSchema)

const mongoose = require('mongoose')

// Create Schema
const userSchema = new mongoose.Schema({
    // id is auto-generated and added by mongoose
    username:{
        type: String,
        maxlength: 100,
        unique: true
    },
    email:{
        type: String,
        maxlength: 50,
        unique: true
    },
    password:{
        type: String,
        maxlength: 50,
        required: true
    }
})

// Create model and export it
module.exports = mongoose.model("User", userSchema)

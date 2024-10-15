const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role:{
        type:Number,
        default:0
    }
});



const userModel = mongoose.model('users', userSchema)

module.exports = userModel
const mongoose = require('mongoose');

const newLogin = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    

   
})

module.exports = mongoose.model('loginDetails', newLogin);
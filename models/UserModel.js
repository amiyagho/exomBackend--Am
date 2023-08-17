const mongoose = require('mongoose');
const UserScheama = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    passward:{
         type: String,
         required: true,
        
    },
    phone:{
        type: String,
       // required:true,
        unique:true,
    },
    address:{
        type: String,
       // require: true,

    },
    
},{ timestamps: true})
module.exports= mongoose.model("User",UserScheama)
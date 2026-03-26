const mongoose = require("mongoose")


const contactSchema = new mongoose.Schema({
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "UserModel",
      },
    fullname:{
        type:String,
        required:true,
        unique:true
    },
    nickname:{
        type:String,
        // required:true
    },
    age:{
        type:Number,
        // required:true
    },
    gender:{
        type:String,

    },
    address:{
        type:String,
        // required:false
    },
    phoneone:{
        type:Number,
        unique:true,
        // required:true
    },
    phonetwo:{
        type:Number,
        unique:true,
        // required:true
    },
    category:{
        type:String,
        // required:false
    }

},{timestamps:true})

module.exports =mongoose.model("contactModel",contactSchema)
 
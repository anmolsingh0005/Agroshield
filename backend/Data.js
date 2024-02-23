const mongoose = require("mongoose");

const channelModel =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        trim:true,
        index:true,
    },
    password:{
        type:String,Number,
        trim:true,
    },
    isAdmin:{
        type:Boolean
    },
    withgoogle:{
        type:Boolean,
        trim:true,
    }
});


const ChannelModel = mongoose.model("userdetail",channelModel)

module.exports = ChannelModel;
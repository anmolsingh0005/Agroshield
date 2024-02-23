const mongoose = require("mongoose");

const channelModel =  new mongoose.Schema({
    cropName:{
        type:String,
        required:true,
        trim: true
    },
    Disease:{
        type:String,
        required: true,
        trim:true,
    },
    solution:{
        type:String,
        required: true,
        trim:true,
    },
    UserName:{
        type:String,
        required:true,
        trim:true,
    },
    type:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        required:true,
        trim:true,
    },
    comment:[
        {
        data:{
            type:String,
            trim:true,
        },
        user:{
            type:mongoose.Types.ObjectId,
            ref:"userdetails",
        }
    }
    ],
    userEditAccess:[
        {
          id:{
            type:String
          }
        }
      ]
});


const ChannelModel = mongoose.model("finalcrop",channelModel)

module.exports = ChannelModel;
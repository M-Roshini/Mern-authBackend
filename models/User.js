const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema(
    {
        //defining the structure/schema
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique:true,
        },
        password: {
            type: String,
            required: true,
        },
        joinedOn:{

            type:Date,
            default:Date.now()
        },
        forgetPassword:{
            time:Date,
            otp:String,
        },
        token: {
            type: String,
            
        },
    },
    {
        collection:"User"
        
    })
module.exports=mongoose.model("User",UserSchema)
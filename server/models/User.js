import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        requird:true
    },
     email:{
        type:String,
        requird:true,
        unique:true
    },
     password:{
        type:String,
        requird:true
    },
     cartItem:{
        type:Object,
        default:{}
    },
},{minimize:false})

const User=mongoose.models.user || mongoose.model('user',userSchema)
export default User;
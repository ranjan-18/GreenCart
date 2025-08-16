import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        requird:true
    },
     description:{
        type:Array,
        requird:true,
     
    },
     price:{
        type:Number,
        requird:true,

    },
     offerPrice:{
        type:Number,
        requird:true,
        
    },
      Image:{
        type:Array,
        requird:true,
        
    },
    category:{
        type:String,
        requird:true
    },
     inStock:{
        type:Boolean,
        default:true
    },
},{timestamps:true})

const Product=mongoose.models.product || mongoose.model('product',productSchema)
export default Product;
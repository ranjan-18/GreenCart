import Order from "../models/Order.js";
import Product from "../models/Product.js";


// place order COD: /api/order/cod
export const placeOdrerCOD=async(req,res)=>{
    try {
        const {address,items,userId}=req.body;
        if(!address || items.length===0)
        {
          res.json({success:false,message:"Invaild data"})  
        }

        // calculate amount using items
        let amount =await items.reduce(async(acc,item)=>{
            const product=await Product.findById(item.product);
            return (await acc)+product.offerPrice*item.quantity;
        },0);

        //add 2% tax
        amount+=Math.floor(amount*0.02);
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        })
        res.json({success:true , message:"Order placed"})
    } catch (error) {
          console.log(error.message);
         res.json({success:false,message:error.message})
    }
}

//Get oders by Id : /api/order/user

export const getUserOrder=async(req,res)=>{
    try {
        const {userId}=req.body;
        const orders =await Order.find({
            userId,
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1})
         res.json({success:true , message: orders})
    } catch (error) {
         console.log(error.message);
         res.json({success:false,message:error.message})
    }

}

// get all orders(for seller / admin) : /api/order/seller

export const getAllOrders=async(req,res)=>{
    try {
    
        const orders =await Order.find({
           
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1})
         res.json({success:true , message: orders})
    } catch (error) {
         console.log(error.message);
         res.json({success:false,message:error.message})
    }

}
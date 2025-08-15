import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

// register User: /api/user/register
export const register=async(req,res)=>{
try {
    const {name,email,password}=req.body;

    if(!name || !email || !password)
    {
        return res.json({success:false,message:"Missing Details"})
    }

    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.json({success:false,message:"Already registered User"})
    }
   
    // password hashing
    const hashedPassword=await bcrypt.hash(password,10)

    const user=await User.create({name,email,password:hashedPassword});

    const token=jwt.sign({id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    )
    res.cookie('token',token,{
        httpOnly:true, //prevent javascript to access cookie
        secure:process.env.NODE_ENV==='production', //use secure key in production
        sameSite:process.env.NODE_ENV==='production'?'none':'strict', //crf protection
        maxAge:7*24*60*60*1000 //cookie expiration time
    })
   return res.json({success:true,message:"User created successfully"})
} catch (error) {
    console.log(error.message);
    
     res.json({success:false,message:error.message})
}
}

//Login User: /api/user/login
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        
         if(!email || !password)
    {
        return res.json({success:false,message:"Missing Details"})
    }

    const user=await User.findOne({email});
    if(!email){
         return res.json({success:false,message:"Invaild Email or password"})
    }
    
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({success:false,message:"Invaild Email or password"})
    }

     const token=jwt.sign({id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    )
    res.cookie('token',token,{
        httpOnly:true, //prevent javascript to access cookie
        secure:process.env.NODE_ENV==='production', //use secure key in production
        sameSite:process.env.NODE_ENV==='production'?'none':'strict', //crf protection
        maxAge:7*24*60*60*1000 //cookie expiration time
    })
   return res.json({success:true,message:"User Login successfully"})

    } catch (error) {
        console.log(error.message);
    
     res.json({success:false,message:error.message})
    }
}



//check Auth: /api/user/is-auth
export const isAuth=async(req,res)=>{
try {
    const { userId } = req.body || {}; // default to empty object

     if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }
    const user=await User.findById(userId).select("-password");
    return res.json({ success: true,message: user });
} catch (error) {
    return res.json({success:false,message:error.message})
}
}

//Logout user:/api/user/logout

export const logout=async(req,res)=>{
    try {
      res.clearCookie('token',{
                httpOnly:true, //prevent javascript to access cookie
                secure:process.env.NODE_ENV==='production', //use secure key in production
                sameSite:process.env.NODE_ENV==='production'?'none':'strict', //crf protection
      })
      return res.json({success:true,message:"Logout Successfully"})  
    } catch (error) {
        res.json({success:false,message:error.message}) 
    }
}
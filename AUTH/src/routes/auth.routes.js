const express=require("express");
const authRouter=express.Router();
const userModel=require("./models/user.model.js")
const crypto=require("crypto")
const jwt=require("jsonwebtoken")
authRouter.post("/register",async (req,res)=>{
    const{email,name,password}=req.body
    const isUserExists= await userModel.findOne({email})
    if(isUserExists){
         return res.status(409).json({
            message:"user already exists"
         })
    }
    const user=await userModel.create({
           name,email,
           password:crypto.createHash("sha256").update(password).digest("hex")

    })
    const token=jwt.sign({
         id:user._id,
         email:user.email
    },process.env.JWT_SECRET)

})

module.exports=authRouter
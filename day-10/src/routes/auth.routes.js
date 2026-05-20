const express=require("express")
const userModel=require("../models/user.model.js")
const jwt=require("jsonwebtoken")
const authRouter=express.Router()
authRouter.post('/register', async (req,res)=>{
    const{name,email,password}=req.body;
    const isUserAlreadyExist= await userModel.findOne({email})
    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"user already exist with this email address"
        })
    }
    const user= await userModel.create({
         name,email,password
    })
    const token=jwt.sign({
        id:user._id,
        email:user.email
    },
      process.env.JWT_SECRET)
      res.cookie("token",token)
    res.status(201).json({
        message:"user created successfully ",
        user,
        token
    })

})
authRouter.post("/login", async (req,res)=>{
     const {email,password}=req.body;
     const user= await userModel.findOne({email})
     if(!user){
        return res.status(404).json({
            message:"user not found with this email address"
        })
     }
     const isPasswordMatched=user.password === password;
     if(!isPasswordMatched){
         return res.status(401).json({
            message:"invalid password"
         })
     }
     const token=jwt.sign({
         id:user._id
     },
       process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(200).json({
        message:"user logged in successfully",
        user
    })
})
module.exports=authRouter
const express=require('express')
const authRouter=express.Router()
const userModel=require("../models/user.model.js")
const crypto=require("crypto")
const jwt=require("jsonwebtoken")
authRouter.post("/register", async(req,res)=>{
    const{email,username,password,bio,profileImage}=req.body
    // const isUsername= await userModel.findOne({username})
    // if(isUsername){
    //     res.status(409).json({
    //         message:'username already exists'
    //     })
    // }
    // const isUserExistbyEmail= await userModel.findOne({email})
    // if(isUserExistbyEmail){
    //     res.status(409).json({
    //         message:'user with this email already exists'
    //     })
    // }
    const isUserAlreadyExist=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]

        
    })
    if(isUserAlreadyExist){
       return res.status(409).json({
            message:'user already exists'
        })
    }
    const hash=crypto.createHash("md5").update(password).digest("hex")
    const user= await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
    })
    const token=jwt.sign({
        id:user._id,

    },process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token)
    res.status(201).json({
        message:'user registered successfully',
        token,
        username:user.username,
        email:user.email,
        bio:user.bio,
        profileImage:user.profileImage
    })
})
authRouter.post("/login",async (req,res)=>{
    const{username,email,password}=req.body
    const user=await userModel.findOne({
        $or:[
            {
                username:username
            },
            {
                email:email
            }
        ]
    })
   if(!user){
      return res.status(404).json({
         message:"user not found "
      })
   }
   const hash=crypto.createHash("md5").update(password).digest("hex")
   const ispassowrdvalid=hash===user.password
   if(!ispasswordvalid){
      return res.status(401).json({
         message:"invalid password"
      })
   }
   const token=jwt.sign({
        id:user._id
   },process.env.JWT_SECRET,{expiresIn:"1d"})
   res.cookie("token",token)
   res.status(200).json({
      message:"user sucessfully logged in",
      user
   })
})

module.exports=authRouter

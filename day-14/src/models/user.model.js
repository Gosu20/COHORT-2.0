const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({
    username:{
       type: String,
       unique:[true,'username already exists'],
       required:[true,'username is required']
    },
    password:{
      type:String,
      required:[true,'password is required']
    },
    email:{
        type:String,
        unique:[true,"email already exists"],
        required:[true,"email is required"]
    },
    bio:String,
    profileImage:{
      type:String,
      default:"https://ik.imagekit.io/dvqbq7taa/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.avif"
    }

})
const userModel=mongoose.model("users",UserSchema)
module.exports=userModel
require("dotenv").config()
const mongoose=require("mongoose")
function ConnectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected To DB")
    })
}
module.exports=ConnectToDb
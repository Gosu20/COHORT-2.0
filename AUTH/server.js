const app=require("./src/app.js")
const mongoose=require("mongoose");
const ConnectToDb=require("./src/config/database.js")
ConnectToDb()
app.listen(3000,()=>{
    console.log("Server is Running on PORT 3000")
})
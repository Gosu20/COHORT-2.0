require("dotenv").config();
const app=require("./src/app.js");
const mongoose=require("mongoose");
const connectToDb=require("./src/config/database.js")
connectToDb();
app.listen(8000,()=>{
    console.log("Server is Running on PORT 8000")
})
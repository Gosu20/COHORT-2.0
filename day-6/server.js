const app=require("./src/app");
const mongoose=require("mongoose")
function connectToDb(){
    mongoose.connect("mongodb+srv://ananyagoswamics23_db_user:16201620aS@cluster0.gbmaexj.mongodb.net/day-6")
    .then(()=>{
        console.log("Connected to databse");
    })
}
connectToDb()
app.listen(8000,()=>{
    console.log("server is running at PORT 8000");
})
const express=require("express");
const app=express();// server create karna , app.js file is for creating a server 
app.use(express.json());
const notes=[
    {
        title:"test title 1",
        description:"test description 1"
    },
    {
        title:"test title 2",
        description:"test description 2"
    }
]
app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.send("note is created")

})
 app.get("/notes",(req,res)=>{
     res.send(notes);
 })
// app.delete("/notes/:index",(req,res)=>{
//     delete notes[req.params.index]
//      res.send("note is deleted")
// })
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description=req.body.description;
    
    res.send("description is updated")
})
module.exports=app

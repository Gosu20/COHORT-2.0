const express=require("express");
const noteModel=require("./models/notes.model.js")
const cors=require("cors")
const app=express();
app.use(express.json())
app.use(cors())
app.post("/notes", async (req,res)=>{
     const{title,Description}=req.body;
     const note= await noteModel.create({
         title,Description
     })
     res.status(201).json({
        message:"note created successfully",
        note
     })
})
app.get("/notes", async (req,res)=>{
     const notes = await noteModel.find()
     res.status(200).json({
        message:"notes fetched successfully",
        notes
     })
})
app.delete("/notes/:id", async (req,res)=>{
     const id=req.params.id
     await noteModel.findByIdAndDelete(id);
     res.status(200).json({
        message:"note deleted successfully"
     })
})
app.patch("/notes/:id", async (req,res)=>{
      const id=req.params.id;
      const{Description}=req.body;
     const updatednote=await noteModel.findByIdAndUpdate(id,{Description})
     res.status(200).json({
        message:"note updated successfully",
        updatednote
     })
})
module.exports=app;
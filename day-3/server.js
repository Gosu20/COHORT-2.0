const express=require("express");
const app=express();
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
app.listen(8000,()=>{
    console.log("server is running on PORT 8000");
});
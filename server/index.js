const express=require("express");
const users=require("./sample.json");

const  cors=require("cors");
const fs=require("fs");


const app=express();
app.use(express.json());

const port=8000;

app.use(
    cors({
        origin:"http://localhost:5173",
        methods:["GET","POST","PATCH","DELETE"],
    })
);

app.get("/users",(req,res)=>{
    return res.json(users);
});

//delete student details
app.delete("/users/:id",(req,res)=> {
    let id=Number(req.params.id);
    let filteredUsers=users.filter((user)=>user.id !== id);

fs.writeFile("./sample.json",JSON.stringify
    (filteredUsers),(err,data)=>{
        return res.json(filteredUsers);
    }
);

});

// to add a stud details
app.post("/users",(req,res)=>{
    let {name,lname,location,email,dob,education,about}=req.body;
    if(!name || !lname || !location || !email || !dob || !education || !about){
        res.status(400).send({message:"All fields required"});
    }
    let id=Date.now();
    users.push({id,name,lname,location,email,dob,education,about});

    fs.writeFile("./sample.json",JSON.stringify
        (users),(err,data)=>{
            return res.json({message:"Student Details added successfully"});
        }
    );
});

//edit the student details
app.patch("/users/:id",(req,res)=>{
    let id=Number(req.params.id);
    let {name,lname,location,email,dob,education,about}=req.body;
    if(!name || !lname || !location || !email || !dob || !education || !about){
        res.status(400).send({message:"All fields required"});
    }
    
    let index=users.findIndex((user)=>user.id==id);

    users.splice(index,1,{...req.body});

    fs.writeFile("./sample.json",JSON.stringify
        (users),(err,data)=>{
            return res.json({message:"Student Details updated successfully"});
        }
    );
});

app.listen(port,(err)=>{
    console.log(`app is running in port ${port}`);
});
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("Hi, I am live");
});

const start = async()=>{
    try{
        app.listen(PORT,()=>{
           console.log(`${PORT} Yes I am conneced`);
        });
    }catch(error){
        console.log(error);
    }
};

start();
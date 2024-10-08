const express =require ("express")
const app = express()

app.get("/user",(req,res)=>{
    res.send("GET Api run successfully ")
})

app.post("/user",(req,res)=>{
    res.send("POST Api run successfully")
})

app.put("/user", (req,res)=>{
    res.send("PUT Api run successfully")
})

app.delete("/user",(req,res)=>{
    res.send ("DELETE Api run successfully")
})

app.use("/user",(req,res)=>{
    res.send("hello this is use page")
})

app.listen(3000,()=>{
    console.log("server connected")
})

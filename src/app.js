const express =require ("express")
const app = express()

// app.use((req,res)=>{
//     res.send("hello world")
// })

app.use("/login",(req,res)=>{
    res.send("hello this is login page")
})

app.use("/test",(req,res)=>{
    res.send("hello this is test page ")
})

app.use("/admin",(req,res)=>{
    res.send("hello this is a admin page")
})
app.use("/user",(req,res)=>{
    res.send("hello this is use page")
})

app.listen(3000,()=>{
    console.log("server connected")
})

const express =require ("express")
const app = express()
const {adminAuth} = require("./middlewares/auth")

app.use("/admin", adminAuth)

app.get("/admin/isUserDeleted",(req,res)=>{
    throw new error("request not valid")
    res.send("user Deleted")
})

app.use("/" ,( err, req,res,next)=>{
    if(err){
        res.status(500).send("oops something went wrong")
    }
})

app.listen(3000,()=>{
    console.log("server connected")
})

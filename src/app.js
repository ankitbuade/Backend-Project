const express =require ("express")
const app = express()
const {adminAuth} = require("./middlewares/auth")

app.use("/admin", adminAuth)

app.get("/admin/isUserDeleted",(req,res)=>{
    res.send("user Deleted")
})

app.listen(3000,()=>{
    console.log("server connected")
})

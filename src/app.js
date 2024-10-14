const express =require ("express")
const app = express()
const {connectDB} = require ("./config/database")
const User = require ("./model/user")

 app.use(express.json())

app.post("/signup",async(req,res)=>{
   
        const user = new User (req.body)
        console.log(req.body)

        try {
            await user.save()
            res.send("data sent successfully")
        }
        catch(err){
            res.status(400).send("error occured")

        }
})

app.get ("/user" , async (req,res)=>{
    const userEmail =req.body.emailId
    try {
        const user =await User.findOne({emailId : userEmail})
       if(!user){
        res.status(400).send("user does not exist ")
       }
       else{
        res.send(user)
       }
        
    }
    catch(err){
        res.status(400).send("something went wrong")
       
    }
})

app.get("/feed", async (req, res)=>{
    
    try {
        const users = await User.find ({})
        res.send(users)
    }

    catch(err){
        res.status(400).send("something went wrong")
       
    }
})

app.delete("/user", async (req,res)=>{
    const userId = req.body.userId
    try {
        const deleteUser = await User.findByIdAndDelete(userId)
        res.send("user Deleted Successfully")
    }

    catch(err){
        res.status(400).send("something went wrong")
       
    }
})

app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params?.userId
    const data = req.body
    console.log(data)
    try {
        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"]

        const isUdateAllowed = object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k))

        if(!isUpdateAllowed){
            throw new Error ("update is not allowed")
        }

        const user = await User.findByIdAndUpdate({_id : userId},data ,{returndocument :"after"})
        console.log(user)
        res.send("updated Successfully")

    }
    catch(err){
        res.status(400).send("something went wrong"+err.message)
       
    }
})

connectDB ()
.then(()=>{
    console.log("connection ehtablish to DB")
    app.listen(3000,()=>{
        console.log("server conected")
    })
})
.catch((err)=>{
    console.error("cant coonnect")
}
)
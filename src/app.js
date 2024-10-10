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
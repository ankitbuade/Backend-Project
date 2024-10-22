const express =require("express")
const {userAuth} = require("../middlewares/auth")
const profileRouter = express.Router()


profileRouter.get("/profileView",userAuth, async (req,res)=>{
    try   {
       const user = req.user
       res.send(user)
    }
   catch(err){
       res.status(400).send("something went wrong"+ err.message)   
   }   
   })

   profileRouter.patch("/profile/edit", userAuth , async(req,res)=>{


   })


module.exports = profileRouter
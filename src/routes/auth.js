const express =require("express")
const {userAuth} = require("../middlewares/auth")
const authRouter = express.Router()
const jwt = require ("jsonwebtoken")
const User = require ("../model/user")
const {signupValidation} = require("../utils/validation")
const bcrypt = require("bcrypt")

authRouter.post("/signup",async(req,res)=>{

    try {
       // validation sign up data
    signupValidation(req)

    const {firstName , lastName, emailId,password}=req.body

    const passwordHash =await bcrypt.hash(password, 10)

    console.log(passwordHash)
   
    const user = new User ({
        firstName ,
        lastName,
        emailId,
        password:passwordHash
    })

            await user.save()
            res.send("data sent successfully")
        }
        catch(err){
            res.status(400).send("error occured")

        }
})

authRouter.post("/login", async (req,res)=>{

    try{
        const {emailId,password} =req.body

        const user =await User.findOne({emailId : emailId})
        if(!user){
            throw new Error("invalid credentials")
        }
 
        const isPasswordValid = await bcrypt.compare(password , user.password)
        if(isPasswordValid){

           const token = await jwt.sign({_id : user._id
           },"Dev@123456",{expiresIn 
            : "1d"
           })
              
            res.cookie("token",token)
            res.send("login SUccessfull")
        } else {
            throw new Error ("invalid credentials")
        }

    }
    catch(err){
        res.status(400).send("something went wrong"+ err.message)
       
    }
})

authRouter.post("/logout" , async (req,res)=>{
    res.cookie("token" , null ,{
        expires : new Date(Date.now())
    })
    res.send("logout Successful!!! ")
})

module.exports= authRouter
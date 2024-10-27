const express = require("express")
const userRouter = express.Router()
const ConnectionRequest = require ("../model/connectionRequest")
const { userAuth } = require("../middlewares/auth")

userRouter.get("/user/request/recieved" , userAuth, async(req,res)=>{

    try {

            const loggedInUser  = req.user

            const connectionRequest = await ConnectionRequest.find({
                toUserId : loggedInUser._id,
                status : interested

            })
            res.json({
                message: "data fetched Successfully",
                data : connectionRequest
            })

    }catch(err){
        res.status(400).send("error : " + err.message)
    }

})
module.exports = 
    userRouter 

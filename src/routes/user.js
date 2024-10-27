const express = require("express")
const userRouter = express.Router()
const ConnectionRequest = require ("../model/connectionRequest")
const { userAuth } = require("../middlewares/auth")
const { createConnection } = require("mongoose")

const USER_SAFE_DATA = "firstName lastName photoURL age number about"

userRouter.get("/user/request/recieved" , userAuth, async(req,res)=>{

    try {

            const loggedInUser  = req.user

            const connectionRequest = await ConnectionRequest.find({
                toUserId : loggedInUser._id,
                status : "interested"

            }).populate("fromUserId",["firstName","lastName","photoURL"])
            res.json({
                message: "data fetched Successfully",
                data : connectionRequest
            })

    }catch(err){
        res.status(400).send("error : " + err.message)
    }

})

userRouter.get("/user/connection", userAuth , async(req, res)=>{
    
    try{

        const loggedInUser = req.user
        const connectionRequest = await ConnectionRequest.find({
            $or : [
                {toUserId : loggedInUser._id, status : "accepted"},
                {fromUserId :loggedInUser ,status : "accepted"}
            ]
        })
        .populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA)

        const data = connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser.toString()){
              return row.toUserId 
            }
            return row.fromUserId
        })
        res.json({data})

    }
    catch(err){
        res.status(400).send({message : err.message})
    }


})
module.exports = 
    userRouter 

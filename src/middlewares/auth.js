const jwt = require ("jsonwebtoken")
const User = require("../model/user")

const userAuth = async (req,res,next)=>{

   
    const {token} =req.cookies
    if(!token){
        return res.status(401).send("cant login ")
    }

    try {
        const decodeObj = await jwt.verify(token,"Dev@123456")

    const {_id} = decodeObj

    const user = await User.findById(_id)

    if(!user){
        return res.status(401).send("user does not exist")
}

        req.user = user
        next()
    }
    catch(err){
      return  res.status(400).send("error occured" + err.message)
    }
}
module.exports= {
    userAuth
}







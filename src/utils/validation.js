const validator = require("validator")

const signupValidation =(req)=> {
    const {firstName, lastName, emailId, password} =req.body

    if(!firstName || !lastName){
        throw new Error("please enter valid name")
    } else if (!validator.isEmail(emailId)){
        throw new Error("enter valid email")
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("enter strong password")
    }
}

module.exports = {
    signupValidation
}
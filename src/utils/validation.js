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

const validateEditProfileData = (req) =>{
    const allowedEditFields=[
    "firstName",
    "lastName",
    "emailId",
    "photoURL",
    "gender",
    "age",
    "about",
    "skills"
]

const isEditAllowed = Object.keys(req.body).every((field)=>
    allowedEditFields.includes(field)
)
return isEditAllowed
}

module.exports = {
    signupValidation,
    validateEditProfileData
}
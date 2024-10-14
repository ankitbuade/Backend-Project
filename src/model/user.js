const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required :true,
        minlength :3,
        maxlength : 50, 
    },
    lastName :{
        type : String,
       
    },
    password : {
        type : String,
        required : true
        
    },
      emailId : {
            type :String,
            unique : true,
            required : true,
            lowercase : true,
            trim : true
    },

    gender : {
        type : String,
        validate (value){
            if(!["male  ","female","other"].includes(value)){
                throw new Error ("gender in not valid")
            }
        }
    },

    age :{
        type : Number,
        min : 18,
        max : 70
    },

    skills : {
        type : [String]
    }
   

}, {
    timestamps :true
})

const User = mongoose.model("User",userSchema)
module.exports = User
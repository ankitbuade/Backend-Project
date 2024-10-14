const mongoose = require("mongoose")
const validator = require("validator")

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
            trim : true,
        validate(value){
                if(!validator.isEmail(value)){
               throw new Error ("invalid Email " + value)
                }     
        }
    },

    photoURL : {
            type : String,
            default : "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",

        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid Photo" + value)
            }
        }
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
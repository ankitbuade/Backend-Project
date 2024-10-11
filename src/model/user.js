const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
    },
    lastName :{
        type : String,
    },
    password : {
        type : String,
    },
      emailId : {
            type :String,
    },

    age :{
        type : Number,
    }

})

const User = mongoose.model("User",userSchema)
module.exports = User
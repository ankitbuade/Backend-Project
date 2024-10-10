const mongoose = require ("mongoose")

const connectDB =async()=>{
    await mongoose.connect("mongodb+srv://Backend:pWN4kAQ6e5bXegbe@backend.20hhu.mongodb.net/devTinder")
}

module.exports={
    connectDB
}
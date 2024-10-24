const mongoose = require ("mongoose")
const connectionRequestSchema = new mongoose.schema(

   {
    fromUserId : {
        type : mongoose.schema.Types.ObjectId,
        required : true

    },

    toUserId : {
        type : mongoose.scema.Types.ObjectId,
        required : true
    },

    status :{
        type : String,
        required : true,
        enum : {
            values : ["ignore","interested","accepted","rejected"],
            message: '{VALUE} is incorrect status type',
        },n 
    },
   },
{
    timestamp : true
}

)
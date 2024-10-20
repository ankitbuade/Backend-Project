const express =require ("express")
const app = express()
const {connectDB} = require ("./config/database")
const User = require ("./model/user")
const {signupValidation} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

app.use(express.json())
app.use(cookieParser())

app.post("/signup",async(req,res)=>{

    try {
       // validation sign up data
    signupValidation(req)

    const {firstName , lastName, emailId,password}=req.body

    const passwordHash =await bcrypt.hash(password, 10)

    console.log(passwordHash)
   
    const user = new User ({
        firstName ,
        lastName,
        emailId,
        password:passwordHash
    })

            await user.save()
            res.send("data sent successfully")
        }
        catch(err){
            res.status(400).send("error occured")

        }
})

app.get ("/user" , async (req,res)=>{
    const userEmail =req.body.emailId
    try {
        const user =await User.findOne({emailId : userEmail})
       if(!user){
        res.status(400).send("user does not exist ")
       }
       else{
        res.send(user)
       }
        
    }
    catch(err){
        res.status(400).send("something went wrong")
       
    }
})

app.get("/feed", async (req, res)=>{
    
    try {
        const users = await User.find ({})
        res.send(users)
    }

    catch(err){
        res.status(400).send("something went wrong")
       
    }
})

app.delete("/user", async (req,res)=>{
    const userId = req.body.userId
    try {
        const deleteUser = await User.findByIdAndDelete(userId)
        res.send("user Deleted Successfully")
    }

    catch(err){
        res.status(400).send("something went wrong")
       
    }
})

app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params?.userId
    const data = req.body
    console.log(data)
    try {
        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"]

        const isUdateAllowed = object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k))

        if(!isUpdateAllowed){
            throw new Error ("update is not allowed")
        }

        const user = await User.findByIdAndUpdate({_id : userId},data ,{returndocument :"after"})
        console.log(user)
        res.send("updated Successfully")

    }
    catch(err){
        res.status(400).send("something went wrong"+ err.message)
       
    }
})

app.post("/login", async (req,res)=>{

    try{
        const {emailId,password} =req.body

        const user =await User.findOne({emailId : emailId})
        if(!user){
            throw new Error("invalid credentials")
        }
 
        const isPasswordValid = await bcrypt.compare(password , user.password)
        if(isPasswordValid){

           const token = await jwt.sign({_id : user._id
           },"Dev@123456")
           console.log(token)

            res.cookie("token",token)
            res.send("login SUccessfull")
        } else {
            throw new Error ("invalid credentials")
        }

        if(!validator.isEmail(emailId)
        ){
            throw new Error ("enter correct emailId")
        }

    }

    catch(err){
        res.status(400).send("something went wrong"+ err.message)
       
    }
})

app.get("/profile", async (req,res)=>{
 try   {

    if(!token){
        throw new Error("invalid credentials")
    }

    const cookies= req.cookies
    const {token} = cookies

    const decodedMessage = await jwt.verify(token , "Dev@123456" )

    const {_id} = decodedMessage
    console.log("Logged in user is " + _id)
 
    const user= await User.findById(_id)
    if(!user){
        throw new Error ("user does not exist")
    }
    res.send(user)
}
catch(err){
    res.status(400).send("something went wrong"+ err.message)
   
}
    
})
 
connectDB ()
.then(()=>{
    console.log("connection ehtablish to DB")
    app.listen(3000,()=>{
        console.log("server conected")
    })
})
.catch((err)=>{
    console.error("cant coonnect")
}
)

// const express = require("express");
// const app = express();
// const { connectDB } = require("./config/database");
// const User = require("./model/user");
// const { signupValidation } = require("./utils/validation");
// const bcrypt = require("bcrypt");
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
// const validator = require("validator");

// app.use(express.json());
// app.use(cookieParser());

// app.post("/signup", async (req, res) => {
//     try {
//         // Validation sign-up data
//         signupValidation(req);

//         const { firstName, lastName, emailId, password } = req.body;
//         const passwordHash = await bcrypt.hash(password, 10);

//         const user = new User({
//             firstName,
//             lastName,
//             emailId,
//             password: passwordHash,
//         });

//         await user.save();
//         res.send("Data sent successfully");
//     } catch (err) {
//         console.error(err);
//         res.status(400).send("Error occurred: " + err.message);
//     }
// });

// app.get("/user", async (req, res) => {
//     const userEmail = req.body.emailId;
//     try {
//         const user = await User.findOne({ emailId: userEmail });
//         if (!user) {
//             return res.status(400).send("User does not exist");
//         }
//         res.send(user);
//     } catch (err) {
//         console.error(err);
//         res.status(400).send("Something went wrong");
//     }
// });

// app.get("/feed", async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.send(users);
//     } catch (err) {
//         console.error(err);
//         res.status(400).send("Something went wrong");
//     }
// });

// app.delete("/user", async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         await User.findByIdAndDelete(userId);
//         res.send("User deleted successfully");
//     } catch (err) {
//         console.error(err);
//         res.status(400).send("Something went wrong");
//     }
// });

// app.patch("/user/:userId", async (req, res) => {
//     const userId = req.params.userId;
//     const data = req.body;

//     try {
//         const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//         const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

//         if (!isUpdateAllowed) {
//             throw new Error("Update is not allowed");
//         }

//         const user = await User.findByIdAndUpdate(userId, data, { new: true });
//         res.send("Updated successfully");
//     } catch (err) {
//         console.error(err);
//         res.status(400).send("Something went wrong: " + err.message);
//     }
// });

// app.post("/login", async (req, res) => {
//     try {
//         const { emailId, password } = req.body;

//         if (!validator.isEmail(emailId)) {
//             throw new Error("Enter a valid emailId");
//         }

//         const user = await User.findOne({ emailId });
//         if (!user) {
//             throw new Error("Invalid credentials");
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (isPasswordValid) {
//             const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || "Dev@123456");
//             res.cookie("token", token);
//             res.send("Login successful");
//         } else {
//             throw new Error("Invalid credentials");
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(400).send("Something went wrong: " + err.message);
//     }
// });

// app.get("/profile", async (req, res) => {
//     const { token } = req.cookies;

//     if (!token) {
//         return res.status(401).send("Access denied. No token provided.");
//     }

//     try {
//         const decodedMessage = jwt.verify(token, process.env.JWT_SECRET || "Dev@123456");
//         const user = await User.findById(decodedMessage._id);
//         res.send(user);
//     } catch (err) {
//         console.error(err);
//         res.status(400).send("Invalid token");
//     }
// });

// connectDB()
//     .then(() => {
//         console.log("Connection established to DB");
//         app.listen(3000, () => {
//             console.log("Server connected");
//         });
//     })
//     .catch((err) => {
//         console.error("Can't connect to DB: ", err);
//     });

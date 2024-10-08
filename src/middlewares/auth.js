const adminAuth = (req,res,next)=>{
    console.log("admin auth checked")
    const token = "xyz"
    const isadminAuthorised = token === "xyz"
    if(!token==="xyz"){
        res.statur(401).send("unauthorised") 
    }
    else {
        next()
}
}

module.exports= {
    adminAuth
}
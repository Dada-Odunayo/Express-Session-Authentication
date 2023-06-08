const session = require("express-session")

exports.isAuth = (req,res,next)=>{
    if(req.session.user && req.session){
        next()
    }
    else[
        res.status(401).json({status:401,message:"Unauthorized"})
    ]
}
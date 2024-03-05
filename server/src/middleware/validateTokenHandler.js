const jwtToken=require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const validateToken=asyncHandler(async(req,res,next)=>{
let token;
let authHeader=req.headers.authorization||req.headers.Authorization;//according to the payload the term Authorization is taken in header
if(authHeader && authHeader.startsWith("Bearer")){  //In payload the authorization always starts with bearer
    token=authHeader.split(" ")[1];//to have space between bearer and token
    jwtToken.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{//verifying token
        if(err){
            res.status(401)
            throw new Error("user is not authorized")
        }
        req.user=decoded.user;//decode the token and add req in user
        next();
    })
    if(!token){
        res.status(401);
        throw new Error("user is not authorized or token is missing")
    }
}
})
module.exports=validateToken;
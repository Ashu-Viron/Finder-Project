const { Account, BlackList } =require("./db");

const jwt=require("jsonwebtoken");
require('dotenv').config();
const jwt_secret=process.env.JWT_SECRET;
const authMiddleware=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith("Bearer ")){
        return res.status(403).json({message:"not valid token"})
    }
    const token= authHeader.split(" ")[1];
    try{
        const checkIfBlacklisted=await BlackList.findOne({token:token})
        if(checkIfBlacklisted){
            return res.status(401).json({
                message:"This session has expired.Please login again"
            });
        }
        const decoded=jwt.verify(token,jwt_secret);
        if(decoded.userId){
            req.userId=decoded.userId;
            next();
        }else{
            return res.status(403).json({message: "Invalid auth Header"})
        }
    }catch(e){
        return res.status(403).json({message:"Invalid auth Header"});
    }
}

module.exports={
    authMiddleware
}


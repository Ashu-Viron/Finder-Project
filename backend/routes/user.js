const express=require('express');
const zod=require('zod');
const {User,Account, BlackList}=require('../db');
const jwt=require('jsonwebtoken');
const { default: axios } = require('axios');
const { authMiddleware } = require('../middleware');
require('dotenv').config();
const jwt_secret=process.env.JWT_SECRET
const router=express.Router();

const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/signup",async(req,res)=>{
    const body=req.body;
    const {success}=signupSchema.safeParse(body);
    if(!success){
        return res.json({
            message:"Incorrect Inputs"
        })
    }
    const user=await User.findOne({
        username:body.username
    })
    if(user){
        return res.json({
            message:"Email already taken"
        })
    }
    const dbUser=await User.create(body);
    const token=jwt.sign({
        userId:dbUser._id
    },jwt_secret)
    res.json({
        message:"User Created successfully",
        token:token
    })
    const userId=dbUser._id
    await Account.create({
        userId,
        Coins:40
    })
})
const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(6)
})

router.post('/signin',async(req,res)=>{
    const body=req.body;
    const {success}=signinSchema.safeParse(body);
    if(!success){
        return res.status(403).json({
            message:"wrong Input"
        })
    }
    const user=await User.findOne({
        username:body.username
    })
    if(!user){
        return res.status(403).json({
            message:"Not find any User with this Email"
        })
    }
    const result=body.password.localeCompare(user.password);
    if(result!=0){
        return res.status(401).json({
            message:"wrong credentials"
        })
    }
    const token=jwt.sign({
        userId:user._id
    },jwt_secret);
    return res.json({token:token});
})

router.get('/username',async(req,res)=>{
    const accessdata = req.headers.authorization;
    const token=accessdata.split(" ")[1];
    const decoded = jwt.verify(token, jwt_secret); 
    const user=await User.findById({
        _id:decoded.userId
    })

    res.json({ username:user.username });
})
router.post('/signout',async (req,res)=>{
    try{
    const authHeader=req.headers.authorization;
    if(!authHeader|| !authHeader.startsWith("Bearer ")){
        return res.status(403).json("not valid token")
    }
    const accesstoken= authHeader.split(" ")[1];
    const checkIfBlacklisted=await BlackList.findOne({token:accesstoken});
    if(checkIfBlacklisted){
        return res.status(204).json({
            message:"your token expired"
        })
    }
    await BlackList.create({ token: accesstoken });
    return res.status(200).json({message:"you are logged out!"});
    }catch(e){
       return  res.status(500).json({
            message:"Internal Server problem"
        })
    }
})

router.get('/Searchchannel',authMiddleware,async(req,res)=>{
    const { channel } = req.query;
    const userAccount=await Account.findOne({
        userId:req.userId
    });
    if(userAccount.Coins<=0){
        return res.status(403).json({message:"You have zero coins"});
    }
    await Account.updateOne({userId:req.userId},{$inc:{Coins:-1}});
    try {
        // Make initial request to start scraping (POST request to /scrape_channels)
        const response = await axios.post('http://localhost:5000/scrape_channels', {
            channels: [`${channel}`]
        })
        res.json(response.data);
    }catch(e){
        // Handle any errors that occur during the initial request
        res.status(500).json({
            message: "Internal server error",
            error: e.message
        });
    }
})

module.exports=router
const express=require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const router=express.Router();
router.post('/recharge',authMiddleware,async (req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    })
    user=req.userId;
    if(!account){
        return res.status(400).json({
            message:"Invalid account"
        })
    }
    const userResponse=req.body.agreement;
    if(userResponse.toLowerCase()==="yes"){
        await Account.updateOne({userId:req.userId},{$inc:{Coins:40}})
        return res.status(200).json({ message: "Thank you for your commitment! Your account has been recharged with 40 coins." });
    }else{
        return res.status(200).json({ message: "You must agree to the commitment to recharge." });
    }
})
router.get('/coins',authMiddleware,async(req,res)=>{
    try {
    const account=await Account.findOne({
        userId:req.userId
    })
    if (!account) {
        return res.status(404).json({ message: "Account not found" });
    }
    const coins=account.Coins;
    res.json({Coins:coins});
} catch (error) {
    // Handle server or database errors
    return res.status(500).json({ message: "Server error", error: error.message });
}
})
module.exports=router;
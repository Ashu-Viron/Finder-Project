const mongoose=require('mongoose');
require('dotenv').config();
const {string,number}=require('zod');
mongoose.connect(process.env.MONGO_URL)

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
},
{timestamps:true});

const AccountSchema=new mongoose.Schema({
    userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
    },
    Coins:{
        type:Number,
        required:true
    }
})

const BlacklistSchema=new mongoose.Schema({
    token:{
        type:String,
        require:true,
        ref:"User"
    },
},  {timestamps:true})

const Account=mongoose.model('Account',AccountSchema);
const User=mongoose.model('User',UserSchema);
const BlackList=mongoose.model('BlackList',BlacklistSchema);

module.exports={
    User:User,
    Account:Account,
    BlackList:BlackList
}
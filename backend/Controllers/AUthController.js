const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const UserModel = require("../Models/User");
//signup
const signup=async(req,res)=>{
    try{
         const {name,email,password}=req.body;
         const user=await UserModel.findOne({email});
         if(user){
            return res.status(409)
                .json({message:`User is already exist,you can login`,success:false});
         }
         const hashedPassword=await bcrypt.hash(password,10);
         const userModel=new UserModel({name,email,password:hashedPassword});
         await userModel.save();
         res.status(200)
           .json({
            message:"Signup successfullly",
            success:true
           });

    }catch(err){
        res.status(500)
           .json({
            message:"Intial server error",
            success:false
           })
    }
}
///login
const login=async(req,res)=>{
    try{
         const {email,password}=req.body;
         const user=await UserModel.findOne({email});
         const errmessage='Auth failed email or password is wrong';
         if(!user){
            return res.status(403)
                .json({message:errmessage,success:false});
         }
        const isPasswordEqual=await bcrypt.compare(password,user.password);
        if(!isPasswordEqual){
               return res.status(403)
                .json({message:errmessage,success:false});
        }
        const jwtToken=jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
         res.status(200)
           .json({
            message:"Login successfullly",
            success:true,
            jwtToken,
            email,
            name:user.name
           });

    }catch(err){
        res.status(500)
           .json({
            message:"Intial server error",
            success:false
           })
    }
}

module.exports={
    signup,
    login
}
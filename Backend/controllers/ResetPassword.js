const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

// password reset token
exports.resetPasswordToken= async(req,res)=>{
    try{
        const {email} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.json({
            success:false,
            message:"Email is not registered "
        })
    }

    const token = crypto.randomUUID();

    const updatedDetails =await User.findOneAndUpdate(
                                    {email:email},
                                    {
                                        token:token,
                                        resetPasswordExpires:Date.now()+ 5*60*1000
                                    },{new:true});

    const url = `http://localhost:3000/update-password/${token}`

    await mailSender(email, "Password reset link", `Password reset link ${url}`);

    return res.json({
        success:true,
        message:"email sent successfully, check email ",
        details:updatedDetails
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            messgae:"Something went wrong while reset the password"
        })
    }
}

// reset password

exports.resetPassword = async (req,res)=>{
    try{

        const {password, confirmPassword, token} = req.body;

        if(password !== confirmPassword ){
            return res.json({
                success:false,
                message:"Password and confirm password not match"
            })
        }

        const userDetails = await User.findOne({token:token});

        console.log(userDetails);

        if(!userDetails){
            return res.json({
                success:false,
                message:"token invalid"
            })
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success:false,
                message:"token is expired , please regenerate it"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await User.findOneAndUpdate(
                                    {token:token},
                                    {password:hashedPassword},
                                    {new:true}
                                    )
         return res.status(200).json({
            success:true,
            message:"Password reset successfully"
         })                           

    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Unable to reset the password, try again later"
        })
    }
}
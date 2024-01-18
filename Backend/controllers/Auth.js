const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie-parser");
const mailSender = require("../utils/mailSender");

// signup

exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      
      otp,
    } = req.body;

    if (
      (!firstName || !lastName || !email || !password,
      !confirmPassword || !otp)
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm password not matched",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("recentOTP is", recentOtp);

    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Otp not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        messsage: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    console.log(profileDetails);

    const user = await User.create({
      firstName,
      lastName,
      email,
      
      password: hashedPassword,
      confirmPassword,
      //contactNumber:null,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    console.log("User " , user)

    return res.status(200).json({
        success:true,
        message:"User registered successfully",
        user
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
        success:false,
        message:"User is unable to registered please try again later"
    })
  }
};

//login

exports.login= async(req,res)=>{
    try{
        const {email,password} = req.body;
        console.log("details are", email, password)

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        };

        const user = await User.findOne({email}).populate("additionalDetails").exec();
        console.log("Database finds the user", user);

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            })
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType:user.accountType
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h"
            });

            user.token = token;
            user.password = undefined;

            const option = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }

            res.cookie("token",token,option).json({
                success:true,
                token,
                user,
                message:"Logged in successfully"
            })

        }else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure, try again"
        })
    }
}

//otp

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    const checkUserPresent = await User.findOne({ email });
    
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };
    //console.log(otpPayload)

    const otpBody = await OTP.create(otpPayload);
    
    res.status(200).json({
      success: true,
      message: "otp sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in sending OTP",
    });
  }
};

//changePassword

exports.changePassword = async(req,res)=>{
  try{
    const {oldPassword, newPassword, confirmNewPassword} = req.body;
    if(newPassword !== confirmNewPassword){
      return res.json({
        success:false,
        message:"Password and confirm password not matched try again"
      })
    }
    const oldHashPwd = await bcrypt.hash(oldPassword,10);
    const userDetails = await User.findOne({password:oldHashPwd})
    if(!userDetails){
      return res.json({
        success:false,
        message:"Invalid old Password"
      })
    }
    const hashedPassword = await bcrypt.hash(newPassword,10);
    await User.findOneAndUpdate(
                            {password:oldHashPwd},
                            {password:hashedPassword},
                            {new:true}  
                              ).then(async()=>{
                                await mailSender(userDetails.email, "Password changed successfully",  `${userDetails.firstName} changed password successfully`);
                                return res.status(200).json({
                                  success:true,
                                  message:"Password changed successfully"
                                })
                              }).catch((err)=>{
                                return res.status(401).json({
                                  success:false,
                                  message:err.message
                                })
                              })
      

  }catch(error){
    console.log(error);
        return res.status(500).json({
            success:false,
            message:"Password change Failure, try again"
        })
  }
}

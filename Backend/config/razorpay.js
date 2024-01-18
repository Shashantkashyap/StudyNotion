const Razropay = require("razorpay");

exports.instance = new Razropay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
    
})
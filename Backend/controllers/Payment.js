const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
//const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { mongoose } = require("mongoose");

//capture razorpay payment

exports.capturePayment = async (req, res) => {
  try {
    const { course_id } = req.body;
    const userId = req.user.id;

    if (!course_id) {
      return res.status(400).json({
        success: false,
        message: "please provide valid course Id",
      });
    }

    let course;
    try {
      course = await Course.findById(course_id);

      if (!course) {
        return res.status(400).json({
          success: false,
          message: "not provide any course",
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "Student is already enrolled",
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "unable to fetch the course",
      });
    }

    const amount = Course.price;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      reciept: Math.random(Date.now()).toString(),
      notes: {
        courseId: course_id,
        userId,
      },
    };

    try {
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);
      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "unable to make payment initiation",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in payment initiiation",
    });
  }
};

//verify signature

exports.verifySignature = async (req, res) => {
  const webhookSecret = "12345678";

  const signature = req.headers["x-razorpay-signature"];

  const shasum = await crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));

  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Payment is authorized");

    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $push: {
            studentsEnrolled: userId,
          },
        },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }

      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            courses: courseId,
          },
        },
        { new: true }
      );
      console.log(enrolledCourse);
      const emailResponse = await mailSender(enrolledStudent.email,"Course Purchase", "Congratulations, you successfully puchase the course");
      console.log(emailResponse);
      return res.status(200).json({
        success:true,
        message:"Signature verified and course added"
      })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          });
    }
  }
  else{
    return res.status(400).json({
        success:false,
        message:"Invalid request"
    })
  }
};

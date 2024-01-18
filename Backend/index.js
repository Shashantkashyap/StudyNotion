const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoute = require("./routes/Profile")
const paymentRoute = require("./routes/Payments")
const courseRoute = require("./routes/Course")
const contactUsRoute = require("./routes/Contact")


const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload")

const dotenv= require("dotenv");
dotenv.config();

const Port = process.env.PORT || 4000;

database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: "http://localhost:5173",
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials:true
}));

app.use(fileUpload({
	useTempFiles:true,
	tempFileDir: "/tmp",
}));

cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/payment",paymentRoute);
app.use("/api/v1/reach",contactUsRoute);

app.get("/",(req,res)=>{
	return res.json({
		success:true,
		message:"Your server is running"
	})
})

app.listen(Port,()=>{
	console.log(`app is running at port no ${Port}`);
})
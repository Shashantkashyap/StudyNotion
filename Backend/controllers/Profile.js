const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


exports.updateProfile =async(req,res)=>{
    try{
        const {dateOfBirth="", about="", contactNumber, gender}= req.body;
        const id = req.user.id;

        if(!gender || !contactNumber){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }

        const userDetails = await User.findById(id);

        const profileId = userDetails.additionalDetails;

        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about= about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails
         });                                         



    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to update Profile"
        })
    }
}

//delete account

exports.deleteAccount = async(req,res)=>{
    try{
        const userId = req.user.id;

        const userDetails = await User.findById(userId)

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

            // HW: unenroll student from all enrolled courses
            
        await User.findByIdAndDelete({_id:userId})

        return res.status(200).json({
            success:true,
            message:"User deleted successfully",
           
         });   

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to delete Account"
        })
    }
}

//user Details

exports.getAllUserDetails = async(req,res)=>{
    try{
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails");


        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"User details fetched successfully",
            data:userDetails
        })
        
        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to fetch user details"
        })
    }

}

exports.updateDisplayPicture = async (req, res) => {
	try {

		const id = req.user.id;
        

	const user = await User.findById(id);
    

	if (!user) {
		return res.status(404).json({
            success: false,
            message: "User not found",
        });
	}
	const image = req.files.pfp;
	if (!image) {
		return res.status(404).json({
            success: false,
            message: "Image not found",
        });
    }
	const uploadDetails = await uploadImageToCloudinary(
		image,
		process.env.FOLDER_NAME
	);
	

	const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

    res.status(200).json({
        success: true,
        message: "Image updated successfully",
        data: updatedImage,
    });
		
	} catch (error) {
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}



}
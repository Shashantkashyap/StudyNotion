const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader")
require("dotenv").config();

//create subsection 

exports.createSubSection =async(req,res)=>{
    try{
        const {sectionId, title, timeDuration, description}= req.body;
        const video= req.files.videoFile;

        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }

        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)

        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url
        });

        const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                                            {
                                                                $push:{
                                                                    subSection:subSectionDetails._id

                                                                }
                                                            },
                                                            {new:true}
                                                        ).populate("subSection").exec()

         console.log(updatedSection)     ;
         return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            updatedSection
         });                                         

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to create subSection"
        })
    }
}

exports.updateSubSection = async(req,res)=>{
    try{
        const {title, timeDuration, description, subSectionId} = req.body;
        const video= req.files.videoFile;


        if(!subSectionId || !title || !timeDuration || !description){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }
        const uploadDetails = await uploadVideoToCloudinary(video,process.env.FOLDER_NAME)


        const subSection = await Section.findByIdAndUpdate(
                                                    {subSectionId},
                                                    {
                                                        title:title, 
                                                        timeDuration:timeDuration, 
                                                        description:description,
                                                        videoUrl: uploadDetails.secure_url
                                                    },
                                                    {new:true}
                                                        )
       
           
           return res.status(200).json({
            success:true,
            message:"SubSection updated successfully",
            updateCourseDetails
        }) ;
                                                                                                            
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update Sub-section",
            error:error.message
        })
    }


}

//delete subsection

exports.deleteSubSection = async(req,res)=>{
    try{
        const {subSectionId} = req.params;
        await Section.findByIdAndDelete({subSectionId});

        return res.status(200).json({
            success:true,
            message:"SubSection updated successfully",
            updateCourseDetails
        }) ;


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Sub-section",
            error:error.message
        })
    }
}

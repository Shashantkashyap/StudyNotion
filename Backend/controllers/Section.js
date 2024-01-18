const Section = require("../models/Section");
const Course = require("../models/Course");


//create section
exports.createSection = async(req,res)=>{
    try{

        const {sectionName, courseId} = req.body;

        console.log("course id is:",courseId)

        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }

        const newSection = await Section.create({sectionName});
        console.log(newSection)

        const updateCourseDetails = await Course.findByIdAndUpdate(courseId
                                                            , {
                                                                $push:{
                                                                    courseContent:newSection._id
                                                                }
                                                            },
                                                            {new:true}
                                                            ).populate({
                                                                path: 'courseContent',
                                                                populate: {
                                                                  path: 'subSection',
                                                                  model: 'SubSection',
                                                                },
                                                              })
                                                              .exec();
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updateCourseDetails
        })                                                      

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create section",
            error:error.message
        })
    }
}

exports.updateSection = async(req,res)=>{
    try{
        const {sectionName, sectionId} = req.body;
        
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                                    {sectionName},
                                                    {new:true}
                                                        )
       
           
           return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            updatedSection
        }) ;
                                                                                                            
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update section",
            error:error.message
        })
    }


}


exports.deleteSection = async(req,res)=>{
    try{
        const {sectionId, courseId} = req.body;
        await Section.findByIdAndDelete(sectionId);

       const updateCourseDetails= await Course.findByIdAndUpdate(courseId,
            {
                $pull:{
                    courseContent:sectionId
                }
            },{new:true})

        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            updateCourseDetails: updateCourseDetails
        }) ;


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete section",
            error:error.message
        })
    }
}
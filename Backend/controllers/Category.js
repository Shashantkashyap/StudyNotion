const Category = require("../models/Category");

//create category

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All feilds are required",
      });
    }

    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });

    console.log(categoryDetails);

    return res.status(200).json({
      success: true,
      message: "category created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in creating Category",
    });
  }
};

//get all category

exports.showAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      { name: true, description: true }
    );
    return res.status(200).json({
      success: true,
      message: "all category returned successfully",
      categories: allCategory
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in showing Category",
    });
  }
};

//category pageDetails
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

   
    const selectedCategory = await Category.findById(categoryId)
      .populate("course")
      .exec();

      
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    const differentCategories = await Category
      .find({
        _id: { $ne: categoryId },
      })
      .populate("course")
      .exec();

   /*   
   const allCategories = await Category.find()
  .populate({
    path: "courses",
    match: { status: "Published" },
    populate: {
      path: "instructor",
      select: "name email", // Specify the fields you want to select for the instructor
    },
  })
  .exec();
console.log("ALL CATEGORIES", allCategories);

const allCourses = allCategories.flatMap((category) => category.courses);
console.log("ALL COURSES", allCourses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
    
      console.log("mostSellingCourses COURSE", mostSellingCourses)
    */
      res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
       // mostSellingCourses,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in showing Category Page Details",
    });
  }
};

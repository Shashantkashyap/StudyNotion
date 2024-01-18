const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect("mongodb+srv://Ed-tech:Shashant123@ed-tech.2x94kvd.mongodb.net/Ed-tech?retryWrites=true&w=majority")
    .then(() => console.log("DB connected successfully"))
    .catch((error) => {
      console.log("DB connection failed");
      console.error(error);
      process.exit(1);
    });
};

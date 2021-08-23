const mongoose = require("mongoose");
const UploadSchema = new mongoose.Schema(
  {
    image: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Upload", UploadSchema);

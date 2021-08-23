const express = require("express");
const router = express.Router();
const Upload = require("../model/upload");
const cloudinary = require("cloudinary");
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router.post("/upload",  (req, res) => {
  let fileStr = req.body.data;
  cloudinary.v2.uploader.upload(fileStr,{upload_preset:"image-data"},(error,result)=>{
    if(error){
      return res.status(500).json({
        status: 500,
        message: "Error Occured in Cloudinary Upload",
        error: error
      })
    } else {
      let image = result.secure_url
      let upload = new Upload({
        image
      })
      upload.save().then(savedImage => {
        if(savedImage){
          res.status(200).json({
            status: 200,
            message: "Upload the Image Successfully",
            data: result,
            savedImage
          })
        } else {
          res.status(401).json({
            status: 401,
            message: "Error in DB"
          })
        }
      })
    }
  }) 
  // try {
    
    
    

  // const data=await cloudinary.v2.uploader.upload(fileStr,{upload_preset:"image-data"})
  
  //   const image = data.secure_url;
  //   const upload = new Upload({
  //     image,
  //   });
  //   const newupload = await upload.save();

  //   res.json({ upload:newupload });
  // } catch (error) {
  //   res.status(500).send(error);
  // }
}),
  router.post("/destroy", (req, res) => {
    try {
      const { public_id } = req.body;
      if (!public_id) return res.status(400).send("no file found");

      cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if (err) throw err;
        res.json(result);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;

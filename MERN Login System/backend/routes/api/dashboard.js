const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");

const validateImageUpload = require('../../validation/ImageUpload');

// const ImageModel = require('../../models/upload-image.model');

router.post("/upload-image", (req, res) => {

  // Form validation
  const { errors, isValid } = validateImageUpload(req.body);

  if (!isValid) {
    console.log(req.body)
    return res.status(400).json(errors);
  }
  else {
    console.log('started');
    console.log(req.body);
    

    const newImage = new ImageModel({
      name: req.body.name,
      img64: req.body.img64
    });
    newImage.save().then(image => res.json(image)).catch(err => console.log(`newImage error: ${err}`));
  }
  
});

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");

// const validateImageUpload = require('../../validation/ImageUpload');

const ImageModel = require('../../models/upload-image.model');

router.post("/upload-image", (req, res) => {

  // Form validation
  // const { errors, isValid } = validateImageUpload(req.body);

  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  console.log('started');
  console.log(req.body);
  const newImage = new ImageModel({
    name: req.body.name,
    img64: req.body.img64
  });
  newImage.save().then(image => res.json(image)).catch(err => console.log(`newImage error: ${err}`));

  // ImageModel.findOne({ name: req.body.name, img64: req.body.img64 }).then(name => {
  //   console.log(name);
  //   if (!name) {
  //     return res.status(400).json({ error: "Image not selected" });
  //   } 

    // else {

    // }

});

// router.post("/sign-in", (req, res) => {
//   // Form validation

//   const { errors, isValid } = validateSignInInput(req.body);

//   // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   const email = req.body.email;
//   const password = req.body.password;

//   // Find user by email
//   User.findOne({ email }).then(user => {
//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ emailnotfound: "Email not found" });
//     }

//     // Check password
//     bcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         // User credentials match user in database
//         // Create JWT Payload
//         const payload = {
//           id: user.id,
//           email: user.email
//         };

//         // Sign token
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           {
//             expiresIn: 31556926 // 1 year in seconds
//           },
//           (err, token) => {
//             res.json({
//               success: true,
//               token: "Bearer " + token
//             });
//           }
//         );
//       } else {
//         return res
//           .status(400)
//           .json({ passwordincorrect: "Password incorrect" });
//       }
//     });
//   });
// });

module.exports = router;
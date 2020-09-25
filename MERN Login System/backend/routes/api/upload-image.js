const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");

const validateImageUpload = require('../../validation/ImageUpload');

const uploadImage = require('../../models/upload-image.model');

router.post('/', (req, res) => {

  // Form validation
  // const { errors, isValid } = validateImageUpload(req.body);

  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  console.log('started');

  uploadImage.findOne({ image: req.body }).then(image => {
    
    if (!image) {
      return res.status(400).json({ image: "Image not selected" });
    } 

    else {
      const newImage = new uploadImage({
        file: req.body.file
      });
      newImage.save().then(image => res.json(image)).catch(err => console.log(err));
    }

  });
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
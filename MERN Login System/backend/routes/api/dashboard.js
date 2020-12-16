const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const axios = require('axios');
const http = require('http');

const validateImageUpload = require('../../validation/ImageUpload');

const ImageModel = require('../../models/upload-image.model');

router.post("/upload-image", (req, res) => {

  // Form validation
  const { errors, isValid } = validateImageUpload(req.body);

  if (!isValid) {
    console.log(req.body)
    return res.status(400).json(errors);
  }
  else {
    console.log('started');
    // console.log(req.body);
    // console.log(req.body.img64)
    console.log(req.body.img64)
    const agentOptions = {
      keepAlive: true,
      keepAliveMsecs: 20000,
      maxSockets: Infinity,
      maxFreeSockets: 256
    }
    axios.post('http://20.69.131.115:80/',
      JSON.parse(`{"img64": "${req.body.img64}"}`), options = {
        agent: new http.Agent({
          keepAlive: true,
          keepAliveMsecs: 20000,
          maxSockets: Infinity,
          maxFreeSockets: 256
        })
      },
      { headers: { 'Access-Control-Allow-Origin': '*', "Content-Type": "application/json;charset=UTF-8", "Connection": "keep-alive", 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.99 Safari/537.36' } })
      .then(data => { res.json(data.data.res) })
      .catch(error => { console.log(error) });
    // const newImage = new ImageModel({
    //   name: req.body.name,
    //   img64: req.body.img64
    // });
    // newImage.save().then(image => res.json(image)).catch(err => console.log(`newImage error: ${err}`));
  }

});

module.exports = router;
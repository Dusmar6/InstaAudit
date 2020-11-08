const Validator = require('validator');
const isEmpty = require('is-empty');
const jwt = require('jsonwebtoken')

// Function to grab the file extension from the file name
const getExtension = (filename) => {
    var parts = filename.split('.');
    return parts[parts.length - 1];
};

// Function to check if a file name has the appropriate extension
const isImage = (filename) => {
let extension = getExtension(data);
    switch (extension.toLowerCase()) {
        case 'jpg':
            return true;
    }
    return false;
};


module.exports = function validateImageUpload(data) {

    let errors = {};
    console.log(`backend ${data.filename}`);
    
    // Checks to see if current time is after the expiration time of the jwt
    let jwtDecoded = jwt.decode(data.jwt.split('Bearer ')[1]);
    if (parseInt(String(Date.now()).substring(0, 10)) > parseInt(jwtDecoded['exp'])) {
        errors.block = `Please log in again to refresh your authentication token`;
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
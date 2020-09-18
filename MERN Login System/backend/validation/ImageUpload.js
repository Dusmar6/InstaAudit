const Validator = require('validator');
const isEmpty = require('is-empty');


// Function to grab the file extension from the file name
function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
};

// Function to check if a file name has the appropriate extension
function isImage(filename) {
let extension = getExtension(data);
    switch (extension.toLowerCase()) {
        case 'jpg':
            return true;
    }
    return false;
};

module.exports = function validateImageUpload(data) {

    let errors = {};

    data.image = !isEmpty(data.image) ? data.image : null;

    // Image Check
    if (Validator.isEmpty(data.image)) {
        errors.image = "No image selected for upload";
    } else if (!Validator.isImage(data.image)) {
        errors.image = "Email is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
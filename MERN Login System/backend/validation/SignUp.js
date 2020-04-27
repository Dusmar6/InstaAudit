const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateSignUpInput(data) {
   
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : "";

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "You must input a password";
    }

    if (Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = "Password confirmation is required";
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
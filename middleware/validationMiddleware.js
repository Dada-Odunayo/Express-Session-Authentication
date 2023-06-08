const {body} = require("express-validator");

exports.validateRegistration = [
    body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({min:3}).withMessage("Name cannot be lesser than three characters")
    .isLength({max:20}).withMessage("Name cannot be greather than 20 characters"),
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Use correct Email address"),
    body("password")
    .isLength({min:6}).withMessage("Password cannot be lesser than 6 characters")
    .isLength({max:15}).withMessage("Password cannot exceed 15 characters")
];

exports.validateLogin =[
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Use correct Email address"),
    body("password")
    .isLength({min:6}).withMessage("Password cannot be lesser than 6 characters")
    .isLength({max:15}).withMessage("Password cannot exceed 15 characters")
];
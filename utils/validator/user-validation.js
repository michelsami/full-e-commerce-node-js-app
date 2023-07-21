
import { check } from "express-validator";
import { validationMiddleware } from "../../middleware/validation-middleware.js";

export const createUserValidation = [
	check("name").notEmpty().withMessage("Name is required")
	.isLength({min:3}).withMessage("Name : is too short")
	.isLength({max:30}).withMessage("Name is too long"),
	check("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Please enter a valid email address"),
	check("password").notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("Password : is too short")
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
	
	validationMiddleware
]

export const updateUserValidation=[
	check("name").notEmpty().withMessage("Name is required")
	.isLength({min:3}).withMessage("Name : is too short")
	.isLength({max:30}).withMessage("Name is too long"),
	check("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Please enter a valid email address"),
	validationMiddleware
]
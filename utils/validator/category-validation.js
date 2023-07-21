import { check } from "express-validator";
import { validationMiddleware } from "../../middleware/validation-middleware.js";

export const createCategoryValidation = [
	check("name").notEmpty().withMessage("Category name is required")
	.isLength({min:3}).withMessage("Category name : is too short")
	.isLength({max:30}).withMessage("Category name is too long"),
	validationMiddleware
]

export const updateCategoryValidation = [
	check("id").isMongoId().withMessage("Invalid category id format"),
	check("name").notEmpty().withMessage("Category name is required")
	.isLength({min:3}).withMessage("Category name : is too short")
	.isLength({max:30}).withMessage("Category name is too long"),
	validationMiddleware
]

export const getCategoryByIDValidation = [
	check("id").isMongoId().withMessage("Invalid category id format"),
	validationMiddleware
]

export const deleteCategoryByIDValidation = [
	check("id").isMongoId().withMessage("Invalid category id format"),
	validationMiddleware
]
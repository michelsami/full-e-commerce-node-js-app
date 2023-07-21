import { check } from "express-validator";
import { validationMiddleware } from "../../middleware/validation-middleware.js";
import { categoryModel } from "../../model/category-model.js";

export const createSubCategoryValidation = [
	check("name").notEmpty().withMessage("Sub-category name is required")
	.isLength({min:3}).withMessage("Sub-category name : is too short")
	.isLength({max:30}).withMessage("Sub-category name is too long"),
	check("categoryID").notEmpty().withMessage("Category ID is required")
	.isMongoId().withMessage("Invalid category id format").custom((value)=>{
		return categoryModel.findById(value).then( result => {
			if (!result){
				return Promise.reject("There is no category with with that ID");
			}
		})
	}),
	validationMiddleware
]

export const updateSubCategoryValidation = [
	check("id").isMongoId().withMessage("Invalid category id format"),
	check("name").notEmpty().withMessage("Sub-category name is required")
	.isLength({min:3}).withMessage("Sub-category name : is too short")
	.isLength({max:30}).withMessage("Sub-category name is too long"),
	check("categoryID").notEmpty().withMessage("Category ID is required")
	.isMongoId().withMessage("Invalid category id format").custom((value)=>{
		categoryModel.findById(value).then( result => {
			if (!result){
				return Promise.reject("There is no category with with that ID");
			}
		})
	}), 
	validationMiddleware
]

export const getSubCategoryByIDValidation = [
	check("id").isMongoId().withMessage("Invalid category id format"),
	validationMiddleware
]

export const deleteSubCategoryByIDValidation = [
	check("id").isMongoId().withMessage("Invalid category id format"),
	validationMiddleware
]
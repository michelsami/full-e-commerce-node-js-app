import express from 'express'

import { createSubCategoryValidation, deleteSubCategoryByIDValidation, getSubCategoryByIDValidation, updateSubCategoryValidation } from '../utils/validator/sub-category.js';
import { createSubCategory, deleteSubCategory, getSubCategories, getSubCategoriesOfSpecificCategory, getSubCategoryByID, ifCreateSubCategoryByParamsID, updateSubCategory } from '../controller/sub-category.js';

export const SubCategoryRouter = express.Router({mergeParams:true})


SubCategoryRouter.route('/')
	.post(ifCreateSubCategoryByParamsID , createSubCategoryValidation, createSubCategory)
	.get(getSubCategoriesOfSpecificCategory ,getSubCategories);

SubCategoryRouter.route('/:id')
	.put(updateSubCategoryValidation , updateSubCategory)
	.get(getSubCategoryByIDValidation, getSubCategoryByID)
	.delete(deleteSubCategoryByIDValidation, deleteSubCategory)
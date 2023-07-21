import express from 'express'

import { createCategory, deleteCategory, getCategories, getCategoryByID, updateCategory } from '../controller/category.js'
import {  createCategoryValidation, deleteCategoryByIDValidation, getCategoryByIDValidation, updateCategoryValidation } from '../utils/validator/category-validation.js'
import { SubCategoryRouter } from './sub-category-route.js'

export const categoryRouter = express.Router()


categoryRouter.use('/:id/sub-category', SubCategoryRouter)

categoryRouter.route('/')
	.post(createCategoryValidation, createCategory)
	.get(getCategories);

categoryRouter.route('/:id')
	.put(updateCategoryValidation , updateCategory)
	.get(getCategoryByIDValidation, getCategoryByID)
	.delete(deleteCategoryByIDValidation, deleteCategory)
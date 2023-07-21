import slugify from "slugify";
import { categoryModel } from "../model/category-model.js";
import asyncHandler from 'express-async-handler';
import { APIError } from "../utils/apiError.js";


export const createCategory = asyncHandler(async(req, res)=>{
	

		const {name} = req.body;
		const newCategory = await categoryModel.create({name: name, slug : slugify(name)})
		res.status(201).json({dataCreated : newCategory})
	
})


export const updateCategory = asyncHandler(async(req, res, next)=>{
	const {id} = req.params;
	const {name} = req.body;
	const updateCategory = await categoryModel.findOneAndUpdate({_id: id}, {name: name, slug:slugify(name)}, {new: true});

	if(!updateCategory) {
		return next(new APIError(`Category id ${id} not found`, 404 ));
	}
	res.status(201).json({dataUpdated : updateCategory});
});  

export const getCategories = asyncHandler(async(req, res, next)=>{

	const page = req.query.page || 1;
	const limit = req.query.limit || 5;
	const skip = (page -1) * limit;
	const categories = await categoryModel.find().skip(skip).limit(limit);

	
	res.status(200).json({data : categories, categoriesCount : categories.length, page: page});
});

export const getCategoryByID = asyncHandler(async(req, res, next)=>{

	const {id} = req.params;
	
	const category = await categoryModel.findById(id);
	console.log(category)
	if(!category) {
        return next(new APIError(`Category id ${id} not found`, 404 ));
    }
	res.status(200).json({data : category});
});

export const deleteCategory = asyncHandler(async(req, res, next)=>{
	const {id} = req.params;
	const categoryToDelate = await categoryModel.findByIdAndDelete(id);
	if(!categoryToDelate) {
        return next(new APIError(`Category id ${id} not found`, 404 ));
    }
	res.status(200).json({dataDeleted : categoryToDelate});
}); 
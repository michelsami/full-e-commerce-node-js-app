import slugify from "slugify";

import asyncHandler from 'express-async-handler';
import { APIError } from "../utils/apiError.js";
import { subCategoryModel } from "../model/subCategory-model.js";

export const ifCreateSubCategoryByParamsID = (req, res, next)=>{
	if(req.params.id){
		req.body.categoryID = req.params.id;
	}
	next();
}; 

export const createSubCategory = asyncHandler(async(req, res)=>{
	
	

		const {name, categoryID} = req.body;
	

		const newSubCategory = await subCategoryModel.create({name: name, slug : slugify(name), categoryID: categoryID})
		res.status(201).json({dataCreated : newSubCategory})
	
})


export const updateSubCategory = asyncHandler(async(req, res, next)=>{

	const {id} = req.params;
	const {name, categoryID} = req.body;
	const updateSubCategory = await subCategoryModel.findOneAndUpdate(
		{_id: id}, {name: name, slug:slugify(name), categoryID: categoryID}, {new: true}
		);

	if(!updateSubCategory) {
		return next(new APIError(`Sub-category id ${id} not found`, 404 ));
	}
	res.status(201).json({dataUpdated : updateSubCategory});
});  

export const getSubCategoriesOfSpecificCategory = (req, res, next)=>{
	const filter = {};
	if(req.params.id){
		
		 filter.categoryID = req.params.id
		 
	}
	req.filter = filter;
	next();
}; 

export const getSubCategories = asyncHandler(async(req, res, next)=>{
	
	const page = req.query.page || 1;
	const limit = req.query.limit || 5;
	const skip = (page -1) * limit;
	const subCategories = await subCategoryModel.find(req.filter).skip(skip).limit(limit)
	.populate({path:'categoryID', select :"name"});

	
	res.status(200).json({data : subCategories, categoriesCount : subCategories.length, page: page});
});

export const getSubCategoryByID = asyncHandler(async(req, res, next)=>{

	const {id} = req.params;
	
	const subCategory = await subCategoryModel.findById(id);
	
	if(!subCategory) {
        return next(new APIError(`Sub-category id ${id} not found`, 404 ));
    }
	res.status(200).json({data : category});
});

export const deleteSubCategory = asyncHandler(async(req, res, next)=>{
	const {id} = req.params;
	const subCategoryToDelete = await subCategoryModel.findByIdAndDelete(id);
	if(!subCategoryToDelete) {
        return next(new APIError(`Sub-category id ${id} not found`, 404 ));
    }
	res.status(200).json({dataDeleted : subCategoryToDelete});
}); 
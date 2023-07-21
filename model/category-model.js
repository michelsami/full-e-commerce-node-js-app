import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
	name: {
		type : String,
		required: [true, "Category Name is required"],
		minlength: [3, "Category Name is too short"],
		maxlength: [30, "Category Name is too long"],
		unique: [true, "Category must be unique"],
		
	},
	slug: {
		type : String,
		lowercase: true 
	}
}, {timestamps:true})


export const categoryModel = mongoose.model("categories", categorySchema)
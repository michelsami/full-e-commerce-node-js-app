import mongoose from "mongoose";


const subCategorySchema = new mongoose.Schema({
	name: {
		type: String,
		unique: [true, "Sub-category must be unique"],
		minlength: [2, "Sub-category is too short"],
		maxlenght: [30, "Sub-category is too long"],
		trim: true,
		required: [true, "Sub-category title is required"]  
	},
	slug:{
		type: String,
        lowercase: true
	},
	categoryID:{
		type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
		required: [true, "Category ID must be provided"]

	}
}, {timestamps: true});

export const subCategoryModel = mongoose.model("subCategories", subCategorySchema);
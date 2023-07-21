import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
	name:{
		type : String,
		required: [true, "user Name is required"],
		minlength: [3, "user Name is too short"],
		maxlength: [30, "user Name is too long"],
		
	}, 
	slug:{
		type:String,
		lowercase: true 
	},
	email:{
		type : String,
		required: [true, "Email is required"],
		minlength: [3, "Email is too short"],
		
		unique: [true, "Email must be unique"],
		tolowercase: true
	},
	accessToken:{},
	refreshToken:{},
	
	password:{
		type : String,
		required: [true, "Password is required"],
	},
	role:{
		type : String,
		required: [true, "Role is required"],
		enum:["admin", "user", "superAdmin"],
		default: "user",
	},
	purchases:{
		type: Array,
        default: []
	},
	resetPasswordCode:String,
	resetCodeExpiration : Date,
	resetCodeVerified:Boolean
}, {timestamps: true});


userSchema.pre('save', async function (next) {
	const user = this;
  
	if (!user.isModified('password')) {
	  return next();
	}
  
	try {
	  const salt = await bcrypt.genSalt(10);
	  const hash = await bcrypt.hash(user.password, salt);
	  user.password = hash;
	  next();
	} catch (error) {
	  return next(error);
	}
  });
  

export const userModel = mongoose.model('users',userSchema)
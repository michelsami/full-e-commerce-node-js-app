import { userModel } from "../model/user-model.js";
import { APIError } from "../utils/apiError.js";

import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import { generateAcessAndRefreshTokens } from "./user.js";


export const verifyPassword = asyncHandler(async(req, res, next)=>{

	const {resetCode } = req.body;
	const hashedCode = crypto.createHash('sha256').update(resetCode).digest('hex');

	
	const user = await userModel.findOne({
		resetPasswordCode: hashedCode,
		resetCodeExpiration: {$gt: Date.now()}
	
	});




	if(!user){
		return next(new APIError('Invalid reset code or expired', 400));
	}

	user.resetCodeVerified = true;
	await user.save();

    res.status(200).json({status: 'success'})


});


export const updatePassword = asyncHandler(async(req, res, next)=>{

	const {email, newPassword} = req.body;

	


	if(!email){
		return next(new APIError('please provide your email', 400));
	}

	const user = await userModel.findOne({email: email});
	const oldUser = user;
	if(!user){
		return next(new APIError('No user with this email', 404));
	}

	if(user.resetCodeVerified !== true){
		return next(new APIError('Reset code not verified', 404));
	}

	user.password = newPassword;
	user.resetPasswordCode = undefined;
	user.resetCodeExpiration = undefined;
	user.resetCodeVerified = undefined;

	const name = user.name;
	const tokens = generateAcessAndRefreshTokens({email, name })
	user.refreshToken = tokens.refreshToken;
	user.accessToken = tokens.accessToken;
	await user.save();


	res.status(201).json({status: 'success', message: 'Password updated successfully', oldUser : oldUser, new : user});

});
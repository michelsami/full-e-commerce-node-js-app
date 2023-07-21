import { userModel } from "../model/user-model.js";
import { APIError } from "../utils/apiError.js";

import asyncHandler from 'express-async-handler';
import crypto from 'crypto';


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
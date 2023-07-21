import { userModel } from "../model/user-model.js";
import { APIError } from "../utils/apiError.js";
import { sendEmail } from "../utils/send-email.js";
import asyncHandler from 'express-async-handler';
import crypto from 'crypto';


export const forgetPassword = asyncHandler(async(req, res, next)=>{

	const {email} = req.body;


	const user = await userModel.findOne({email: email});
	
	if(!user){
			
			return next(new APIError('No user found for this email', 404));
		}
	
	const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
	
	const hashedCode =  crypto.createHash('sha256').update(resetCode).digest('hex');
	
	user.resetPasswordCode = hashedCode;
	user.resetCodeExpiration = Date.now() + (10*50*1000);
	user.resetCodeVerified = false;
	await user.save();

	try {
		await sendEmail({
			emailTo: email,
			subject: 'Password Reset Code',
			mainMessage:` Hi ${user.name}, kindy find your password reset code ${resetCode}`
		})
		return res.status(200).json({Message: 'Password reset code has been sent to your email'})

	} catch (error) {
		
		user.resetPasswordCode = undefined;
	user.resetCodeExpiration = undefined;
	user.resetCodeVerified = undefined;
	await user.save();
	
            return next(new APIError("error in send email", 500));
	}
}); 
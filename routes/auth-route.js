import express from 'express'
import {  authenticateUserWithToken, checkIfUniqueEmail, createUser, deleteUser, loginUser, updateUser } from '../controller/user.js';
import { changePasswordValidation, createUserValidation, updateUserValidation } from '../utils/validator/user-validation.js';
import { forgetPassword } from '../controller/forget-password.js';
import { updatePassword, verifyPassword } from '../controller/verify-reset-password-code.js';

export const AuthenticationRouter = express.Router();



AuthenticationRouter.route('/register')
	.post(createUserValidation, checkIfUniqueEmail , createUser)


AuthenticationRouter.route('/login')
    .post( loginUser)


AuthenticationRouter.route('/delete')
    .delete( deleteUser)


AuthenticationRouter.route('/update')
    .put(authenticateUserWithToken, updateUserValidation ,updateUser)


AuthenticationRouter.route('/forgetpassword')
    .post(forgetPassword)

AuthenticationRouter.route('/verifypassword')
   .post(verifyPassword)

AuthenticationRouter.route('/updatepassword')
    .post(changePasswordValidation, updatePassword)
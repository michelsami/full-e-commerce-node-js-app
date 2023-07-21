import express from 'express'
import {  authenticateUserWithToken, checkIfUniqueEmail, createUser, deleteUser, loginUser, storeassword, updateUser } from '../controller/user.js';
import { createUserValidation, updateUserValidation } from '../utils/validator/user-validation.js';
import { forgetPassword } from '../controller/forget-password.js';
import { verifyPassword } from '../controller/verify-reset-password-code.js';

export const AuthenticationRouter = express.Router();



AuthenticationRouter.route('/register')
	.post(createUserValidation, checkIfUniqueEmail ,storeassword, createUser)


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
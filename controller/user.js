
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { userModel } from '../model/user-model.js';
import slugify from 'slugify';
import jwt from 'jsonwebtoken';



// export const authenticateUser= asyncHandler(async(req, res, next)=>{

// 	jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
// 		if (err) {
// 		  // Refresh token is invalid or has expired
// 		  return res.sendStatus(401);
// 		}
	  
// 		// Generate new access token
// 		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
	  
// 		// Return new access token to client
// 		res.json({ accessToken });
// 	  });
// 	  next();
// });

export const authenticateUserWithToken = asyncHandler(async(req, res, next)=>{
	
	const authHeader = req.headers['authorization'];
		if(!authHeader){
		return res.status(401).json({ error: 'No authorization header found' })
	}
   
	
	const [bearer, token] = authHeader.split(' ');

	if (bearer !== 'Bearer' || !token) {
	  res.status(401).json({ error: 'Invalid authorization header' });
	  return;
	}

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
    
      if (err.name === 'TokenExpiredError') {
        const refreshToken = req.body.token;

        if (!refreshToken) {
          return res.sendStatus(401).json('You are not authorized to access this');
        }

      
        jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
          if (err) {
            return res.sendStatus(403).json('You are not authorized to access this');
          }

          // Generate a new access token
          const accessToken =  jwt.sign({ email: decoded.email, name :decoded.name}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

          // Set the new access token on the response object
          res.set('Authorization', `Bearer ${accessToken}`);

          // Set the authenticated user on the request object
          req.user = decoded;

          // Call the next middleware function
          next();
        });
      } else {
        return res.sendStatus(403);
      }
    } else {
      // Set the authenticated user on the request object
      req.user = decoded;

      // Call the next middleware function
      next();
    }
  });
	
	
	// const authHeader = req.headers.authorization;
	
	// if(!authHeader){
	// 	return res.status(401).json({ error: 'No authorization header found' })
	// }
	
	
	// const [bearer, token] = authHeader.split(' ');

	// if (bearer !== 'Bearer' || !token) {
	//   res.status(401).json({ error: 'Invalid authorization header' });
	//   return;
	// }

	// const decodedToken = jwt.verify(token, process.env.secretKey);
	
    // const user = await userModel.findOne({ email: decodedToken.email });

    // if (!user) {
    //   res.status(401).json({ error: 'User not found' });
    //   return;
    // }

    // req.body.user = user;
    // next();
})

export const storeassword = asyncHandler(async(req, res, next)=>{

	
	const {password } = req.body;
	const hash = await bcrypt.hash(password, 10);
	req.body.hashedPassword =  hash;
	next();

})


export const checkIfUniqueEmail = asyncHandler(async(req, res, next)=>{
	const {email} = req.body;
	const user = await userModel.findOne({email});
	if(user){
        return res.status(400).json({error: "Email already exists"})
    }
	next();
})


export const createUser = asyncHandler(async(req, res)=>{

	const {name, email, hashedPassword } = req.body;

	const accessToken = jwt.sign({ email, name }, process.env.JWT_SECRET , { expiresIn: '15m' });
	const refreshToken = jwt.sign({ email, name }, process.env.JWT_SECRET_REFRESH , { expiresIn: '7d' });


	const newUser = {name: name, password: hashedPassword, email: email, slug:slugify(name), refreshToken: refreshToken}
	
	const createNewUser = await userModel.create(newUser);
	const {password, token, ...user} = newUser;
	res.status(201).json({NewUserCreated : user, token : accessToken})

})

export const loginUser = asyncHandler(async(req, res)=>{

	const { email, password } = req.body;

	
	const userExsist = await userModel.findOne({ email });

	if (!userExsist) {
	  res.status(401).json({ error: 'Invalid email or password' });
	  return;
	}

	const isPasswordValid = bcrypt.compare(password, userExsist.password);

	if (!isPasswordValid) {
	  res.status(401).json({ error: 'Invalid email or password' });
	  return;
	}
	
	
	
	  res.json({ message: 'Login successful' , userDetails:{id : userExsist._id, email : userExsist.email, name : userExsist.name}});
	

})


export const deleteUser = asyncHandler(async(req, res)=>{

	const {email} = req.body;
	const deletedUser = await userModel.deleteOne({email:email});	
	res.status(204).json({deletedUser: deletedUser})
	

})


export const updateUser = asyncHandler(async(req, res)=>{

	const user = req.body.user;
	const { name, email } = req.body;
	if(user.name){
		user.slug = slugify(name);
	}
	if(user.email){
        const userExsist = await userModel.findOne({email});
		console.log(userExsist)
		if(userExsist){
            return res.status(400).json({error: "Email already exists"})
        }
    }
	user.name = name || user.name;
    user.email = email || user.email;
 

    const updatedUser = await user.save();

    res.status(201).json(updatedUser);
})



// add deactive user
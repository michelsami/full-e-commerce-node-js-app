import express from "express";
import dotenv from 'dotenv';

import { globalError } from "./middleware/global-error.js";
import { connectionDB } from "./config/DBConnection.js";
import { categoryRouter } from "./routes/category-route.js";
import { SubCategoryRouter } from "./routes/sub-category-route.js";
import { AuthenticationRouter } from "./routes/auth-route.js";


const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

// database connection 
connectionDB()


app.use(express.json())

// mount router
app.use('/category',categoryRouter)
app.use('/sub-category',SubCategoryRouter)
app.use('/auth', AuthenticationRouter )

// global error
app.use(globalError)


const server = app.listen(PORT, ()=>{
	console.log(`server listen on localhost//${PORT}`)
})


process.on("unhandledRejection", (err)=>{
	console.error(`unhandledRejection : ${err.name}	|| ${err.message}`)
	process.abort(()=>{
		console.log("server shutdown")
		process.exit(1)
	})
})
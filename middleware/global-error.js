
const developmentError = (res, err) => {
	
	return res.status(err.statusCode).json({
		status: err.status,
        error: err,
		message: err.message,
		stack:err.stack
	})
}


const productionError = (res, err) => {
	return res.status(err.statusCode).json({
		status: err.status,
      
		message: err.message
		
	})
}

export const globalError = (err, req, res, next)=>{
	if(process.env.MODE === 'development'){
		return developmentError(res, err);
	}else{
		return productionError(res, err);
	}
}

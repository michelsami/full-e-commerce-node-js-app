import mongoose from "mongoose"

export const connectionDB = ()=>{
	mongoose.connect(process.env.DB_URI).then(conn => {
		console.log(`data connected done : ${conn.connection.host}`)
	}).catch(e =>{
		
		console.log(`data not connected with error ${e}`)
	})
}
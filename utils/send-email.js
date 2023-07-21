import nodemailer from 'nodemailer';

export const sendEmail = async(options)=>{

	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT, 
		secure: true, // true for 465, false for other ports like 587
		auth: {
					user: process.env.EMAIL, 
					pass: process.env.EMAIL_PASSWORD 
				}
	});

	await transporter.sendMail({
		from: "Express Shop <futureisnowtest@gmail.com>",
		to: options.emailTo,
		subject: options.subject,
		text: options.mainMessage
	})
};
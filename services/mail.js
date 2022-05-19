const nodemailer =require("nodemailer");
const { SERVER } = require("../config/environment");
const CONSTANT = require("../constant/constant");
const { logger } = require("./../services/logger");
const fromEmail = SERVER.FROM_EMAIL;
// using smtp
const transporter = nodemailer.createTransport({
	host: SERVER.SMTP.HOST,
	port: SERVER.SMTP.PORT,
	secure: false, // use SSL
	//requireTLS: true,
	auth: {
		user: SERVER.SMTP.USER,
		pass: SERVER.SMTP.PASSWORD
	}
});

const sendMailViaSmtp=async(params) =>{
    try {
        const mailOptions = {
            from: `${CONSTANT.PROJECT_NAME} <${fromEmail}>`,
            to: params.email,
            subject: params.subject,
            html: params.content
        };
        console.log("params.content",params)
        if (params.bcc) mailOptions["bcc"] = params["bcc"];
        if (params.attachments) mailOptions["attachments"] = params["attachments"];
        return new Promise(function (resolve, reject) {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    resolve(false);
                } else {
                    console.log("Message sent: " + info.response);
                    resolve(true);
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
};


const sendMail=async(params) =>{
    
 return await sendMailViaSmtp(params);

};
module.exports = { sendMail }

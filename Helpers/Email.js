require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service : 'gmail' , 
    auth : {
        user : process.env.EMAIL_USER , 
        pass : process.env.EMAIL_PASSWORD
    }
});

exports.sendVerification = (email , token) => {
    const link = `${process.env.BASE_URL}/auth/verify-email-email?token=${token}`;
    return transporter.sendMail({
        from : process.env.EMAIL_USER , 
        to : email , 
        subject : "Verify your email" , 
        html: `
            <h2>Welcome to our shop!</h2>
            <p>Please click the link below to verify your email:</p>
            <a href="${link}">Verify Email</a>
            <p>This link expires in 15 minutes.</p>
        `
    });
};

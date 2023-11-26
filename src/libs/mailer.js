const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_SMTP,
        pass: process.env.PASS_SMTP
    },
})

async function UserActivation(email, activationLink) {
    
    const mailOptions = {
        from: process.env.SENDER,
        to: email,
        subject: 'Welcome to Binar👋 - Verify Your Account',
        html: `
        <p>Hello and welcome to Binar Academy!</p>
        <p>Congratulations on becoming a part of our community. To activate your account, please click the link below:</p>
        <a href="${activationLink}">Activate Your Account</a>
        <p>If you did not sign up for Binar Academy, you can safely ignore this email.</p>
        <p>Thank you, and we hope you have a fantastic experience with Binar Academy!</p>        
        `,
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log("Welcome email sent: " + info.response)
        return true;
    } catch (error) {
        console.error(error)
        return false
    }
}

async function Notification(email) {
    
    const mailOptions = {
        from: process.env.SENDER,
        to: email,
        subject: 'Notif - Verify Your Account',
        html: `
        <p>Account activated successfully!</p>     
        `,
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log("Notif email sent: " + info.response)
        return true;
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = { UserActivation, Notification }

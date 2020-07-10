const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_AUTH_KEY
    }
});

const sendWelcomeEmail = (email, name) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Thanks for joining my app!',
        text: `Welcome to the app, ${name}. Please let me know how do you like the app.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const sendByeEmail = (email, name) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Sorry to see you leaving my app!',
        text: `Good bye, ${name}. Please let me know what things you didn't like in the app and I try to update them as soon as possible.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = {
    sendWelcomeEmail,
    sendByeEmail
};
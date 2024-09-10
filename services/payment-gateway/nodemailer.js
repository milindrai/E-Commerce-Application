const nodemailer = require('nodemailer');


// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.yourEmail,
        pass: process.env.appPassword               // If using App Password
        // pass: 'your-email-password'               // If using your Gmail password directly (less secure)
    }
});

// Example of sending an email
const mailOptions = {
    from: '"VortexCommerce" <milindrai365@gmail.com>',
    to: 'milindrai967@gmail.com',
    subject: 'Complete Your Payment',
    text: `Please complete your payment of 1000/- on the given UPI ID:${process.env.myUpiId}`,
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Email sent: ' + info.response);
});

module.exports = { transporter };

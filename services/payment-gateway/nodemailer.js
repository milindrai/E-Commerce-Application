const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.youremail,
        pass: process.env.appPassword,
    },
});

module.exports = { transporter };

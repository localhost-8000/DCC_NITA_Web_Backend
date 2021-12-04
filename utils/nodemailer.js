const nodemailer = require("nodemailer");
const { email, pass, clientId, clientSecret, refreshToken } = require("../config");

//==================create mail transporter======================
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: email,
        pass: pass,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
    },
});


//=======verify if transporter is ready or not============
transporter.verify((err, success) => {
    err
        ? console.log(err)
        : console.log(`==server is ready to send message: ${success}==`);
});


module.exports = transporter;
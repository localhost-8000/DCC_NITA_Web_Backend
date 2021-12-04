const express = require("express");
const transporter = require("../utils/nodemailer");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// implement rate limiting for sending mail......
router.use(
    rateLimit({
        windowMs: 60 * 60 * 1000,  // 1 hour
        max: 2,
        message: "Rate limit exceeded for the api. Only 2 requests per hour is allowed",
        headers: true
    })
);

// send mail...
router.post('/send-mail', (req, res) => {
    try {
        const userEmail = req.body.email;
        const userName = req.body.name;

        const emailOptions = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: "Reply from DCC NITA",
            html: `
                <p>Hello <b>${userName}</b>...</p>
                <p></p>
                <p>Here is my message:</p>
            `
        }
    
        transporter.sendMail(emailOptions, (err, info) => {
            if(err) {
                res.status(403).json({
                    error: err.message,
                    message: "mail not sent!"
                });
            } else {
                res.status(200).json("message sent");
            }
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
});



module.exports = router;
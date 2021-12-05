const express = require("express");
const transporter = require("../utils/nodemailer");
const rateLimit = require("express-rate-limit");
const { email } = require("../config");
const Subscriber = require("../models/Subscriber");


const router = express.Router();

// implement rate limiting for sending mail......
const rateLimiting = rateLimit({
    windowMs: 2 * 60 * 1000,  // 2 minute
    max: 1,
    message: "Rate limit exceeded for the api. Only 1 requests per 2 minutes is allowed",
    headers: true
});

// send mail...
router.post('/contact-us', rateLimiting, (req, res) => {
    try {
        const userEmail = req.body.email;
        const userName = req.body.name;
        const userMsg = req.body.message;

        if(userEmail === undefined || userName === undefined || userMsg === undefined) {
            res.status(400).json({
                error: true,
                message: "Undefined values received..!"
            });
            return;
        }

        const emailOptions = {
            from: email,
            to: email,
            subject: "A message for DCC NITA",
            html: `
                <h3>A message to DCC NITA Team</h3>
                <p><b>Name:- </b> ${userName}</p>
                <p><b>Email:- </b> ${userEmail}</p>
                <p><b>Here is my message:-</b> <br/>${userMsg}</p>
            `
        }
    
        transporter.sendMail(emailOptions, (err, info) => {
            if(err) {
                res.status(403).json({
                    error: err.message,
                    message: "mail not sent!"
                });
            } else {
                res.status(200).json({
                    message: "User message received.."
                });
            }
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
});


router.post('/subscribe', async (req, res) => {
    try {
        const email = req.body.email;
        if(email === undefined) {
            res.status(400).json({
                error: true,
                message: "Undefined values received..!"
            });
            return;
        }
        let emailExist = await Subscriber.findOne({email: email});

        if(emailExist) {
            res.status(302).json({
                message: "Email already exist"
            });
        } else {
            const subscriber = new Subscriber({
                email: email
            });
            let result = await subscriber.save();
            res.status(200).json({
                message: "success"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
})



module.exports = router;
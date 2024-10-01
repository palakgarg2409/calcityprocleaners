import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import * as functions from 'firebase-functions';
import nodemailer from 'nodemailer';

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // e.g., smtp.gmail.com
    port: 587, // Usually 587 for TLS
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'visheshgargbnl@gmail.com', // Your email
        pass: 'ycrf lhls mlrq flja' // Your email password or app password
    },
});

export const sendEmail = functions.https.onRequest((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600'); // 1 hour

    if (req.method === 'OPTIONS') {
        return res.status(204).send('');
    }else{
        console.log(req.body);
        var boddy = req.body;
        console.log(boddy.sender);
        var sender = boddy.sender;
        var to = "visheshgargbnl@gmail.com";
        console.log("The email of user: " + sender + ". The datatype of user email: " + typeof(sender));
        var name = boddy.naam;
        var msg = boddy.msg;
        var contact = boddy.contactt;

        var mailOptions = {
            from : sender,
            to : 'visheshgargbnl@gmail.com',
            subject : 'Inquiry from '+ name,
            html : 'Hello'
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send('Internal Server Error');
            }
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        });
    }
});
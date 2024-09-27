/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Runs on the server using Node.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../clean'));  // Serve frontend files
app.use(express.static('../mail'));

app.get('/', (req, res) => {
    res.sendFile("index.html");
    document.querySelector()
});

app.post('/sendEmail', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // e.g., smtp.gmail.com
        port: 587, // Usually 587 for TLS
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'visheshgargbnl@gmail.com', // Your email
            pass: 'ycrf lhls mlrq flja' // Your email password or app password
        },
    });

    // Email options
    const mailOptions = {
        from: email, // Sender address
        to: 'visheshgargbnl@gmail.com', // List of recipients
        subject: `Message from ${name}`, // Subject line
        text: message, // Plain text body
        html: `<p>${message} <br> Contact: ${phone}</p>`, // HTML body (optional)
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
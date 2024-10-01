const functions = require('firebase-functions');
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); 

// Initialize the Express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../clean'));  // Serve frontend files
app.use(express.static('../mail'));
app.use(cors({ origin: true }));

// Main route
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/clean/index.html");  // Serve the HTML file
});

// Send email route
app.post('/sendEmail', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use TLS
        auth: {
            user: 'visheshgargbnl@gmail.com',  // Your Gmail address
            pass: 'ycrf lhls mlrq flja',  // App-specific password
        },
    });

    // Email options
    const mailOptions = {
        from: email, // Sender address
        to: 'visheshgargbnl@gmail.com', // Your email
        subject: `Message from ${name}`, // Subject line
        text: message, // Plain text body
        html: `<p>${message} <br> Contact: ${phone}</p>`, // HTML body
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

// Export the Express app as a Firebase Cloud Function
exports.app = functions.https.onRequest(app);

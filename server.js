const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Replace with your Gmail credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'amal17philip@gmail.com', // your Gmail address
        pass: 'your-app-password'    // your Gmail app password
    }
});

app.post('/send', (req, res) => {
    const { name, email, phone, comment } = req.body;
    const mailOptions = {
        from: email,
        to: 'amal17philip@gmail.com', // your Gmail address
        subject: `Portfolio Contact: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${comment}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


        
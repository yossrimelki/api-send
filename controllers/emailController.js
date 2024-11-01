const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure this is at the top of your file
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAILAPP,
  },
  logger: true, // Enable debug logging
  debug: true,   // Show debug logs
});



exports.sendReclamation = async (req, res) => {
  const { email, username, subject, message } = req.body;

  console.log("Received data:", { email, username, subject, message }); // Log the received data

  // Check if recipient email is present
  if (!email) {
    return res.status(400).json({ message: 'Recipient email is missing' });
  }

  let emailm = `${email}, mdsouissi96@gmail.com`;
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: emailm,
    subject: 'Reclamation Submission',
    html: `
      <p>Hi ${username},</p>
      <p>Thank you for your ${subject}. Here are the details:</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <p>Best wishes,</p>
      <p>thank you.</p>
    `,
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);

    // Return success response with email info only
    res.status(200).json({
      message: 'Email sent successfully',
      emailInfo: info,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: 'Error sending email', error });
  }
};
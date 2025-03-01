import nodemailer from "nodemailer";

const sendMail = async function ({email, subject, messageHTML}) {
    
  try {
    // Create the transporter
    const auth = nodemailer.createTransport({
      service: process.env.GMAIL_HOST_NAME,
      secure: true,
      port: parseInt(process.env.GMAIL_PORT) || 465, // Ensure the port is an integer
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email details
    const receiver = {
      from: process.env.SMTP_FROM_MAIL,
      to: email,
      subject: subject,
      html: messageHTML, // Use the HTML content here
    };

    // Send the email
    const emailResponse = await auth.sendMail(receiver);
    console.log("Email sent successfully:", emailResponse.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

export default sendMail;

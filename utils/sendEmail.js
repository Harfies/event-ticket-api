const nodemailer = require("nodemailer");

/*const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    console.log("Sending email to:", to);

    const info = await transporter.sendMail({
      from: `"Event Tickets 🎟️" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("Email sent ✅:", info.response);
  } catch (error) {
    console.log("Email failed ❌:", error.message);
  }
};
*/

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html, qrImage) => {
  await transporter.sendMail({
    from: `"Event Tickets 🎟️" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html, // 👈 important
    attachments: [
      {
        filename: "qr.png",
        content: qrImage.split("base64,")[1], // extract base64 data
        encoding: "base64",
        path: qrImage,
        cid: "qrcode", // same cid value as in the html img src
      },
    ],
  });
};

module.exports = sendEmail;

const nodemailer = require("nodemailer");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html, qrImage) => {
  try {
    const data = await resend.emails.send({
      from: "Event Tickets 🎟️  <onboarding@resend.dev>",
      to,
      subject,
      html, // 👈 important
    });
    console.log("✅ Email sent:", data);
  } catch (error) {
    console.log("❌ Email error:", error);
  }
};

module.exports = sendEmail;

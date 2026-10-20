const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async (to, subject, html, qrImage) => {
  try {
    // Prepare the email
    const email = {
      sender: {
        name: process.env.BREVO_SENDER_NAME || "Event Tickets",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    };

    // Attach the QR image if one was provided
    if (qrImage) {
      const base64Content = qrImage.replace(/^data:image\/\w+;base64,/, "");

      email.attachment = [
        {
          name: "ticket.png",
          content: base64Content,
        },
      ];
    }

    const result = await brevo.transactionalEmails.sendTransacEmail(email);

    console.log("✅ Email accepted by Brevo:", result.messageId);

    return result;
  } catch (error) {
    console.error("❌ Email error:", error.message || error);

    throw error;
  }
};

module.exports = sendEmail;

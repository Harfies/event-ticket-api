require("dotenv").config();

const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

async function testEmail() {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: process.env.BREVO_SENDER_NAME,
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [
        {
          email: "akinsolaafeez82@gmail.com",
        },
      ],
      subject: "Testing Brevo - Event Tickets",
      htmlContent: `
          <h2>Brevo email test successful!</h2>
          <p>Your event ticket backend can send emails.</p>
        `,
    });

    console.log("Email accepted:", result.messageId);
  } catch (error) {
    console.error("Brevo error:", error.message || error);
  }
}

testEmail();

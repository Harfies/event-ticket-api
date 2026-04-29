const ticketTemplate = (data, qrImage) => {
  return `
  <div style="font-family: Arial; background:#f4f6f8; padding:20px;">
    
    <div style="max-width:500px; margin:auto; background:white; border-radius:12px; overflow:hidden;">

      <!-- HEADER -->
      <div style="background:#4CAF50; padding:20px; text-align:center;">
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="80" />        <h2 style="color:white; margin-top:10px;">Event Ticket 🎟️</h2>
      </div>

      <!-- BODY -->
      <div style="padding:20px;">
        <p>Hello,</p>
        <p>Your payment was successful. Here are your ticket details:</p>

        <p><strong>🎉 Event:</strong> ${data.eventName}</p>
        <p><strong>📅 Date:</strong> ${data.date}</p>
        <p><strong>📍 Location:</strong> ${data.location}</p>
        <p><strong>🎫 Ticket ID:</strong> ${data.ticketId}</p>
        <p><strong>💳 Reference:</strong> ${data.reference}</p>

        <div style="text-align:center; margin:20px 0;">
        <img src="cid:qrcode" width="150" />
        </div>

        <p style="color:#555;">Please present this ticket at the venue.</p>
      </div>

      <!-- FOOTER -->
      <div style="background:#f0f0f0; padding:10px; text-align:center; font-size:12px;">
        © 2026 Event Booking
      </div>

    </div>
  </div>
  `;
};

module.exports = ticketTemplate;

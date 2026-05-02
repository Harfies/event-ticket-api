A backend API that allows users to book event tickets, make payments via Paystack, receive QR-coded tickets via email, and verify tickets at entry.

🚀 Features

- 💳 Paystack payment integration
- 📧 Email ticket delivery
- 🔳 QR code generation
- ✅ Ticket verification endpoint
- 🔐 Webhook security (signature verification)
- 📚 Swagger API documentation

🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Paystack API
- Nodemailer

⚙️ Installation
git clone https://github.com/your-username/event-ticket-api.git
cd event-ticket-api
npm install

🔐 Environment Variables
Create a `.env` file:

MONGO_URI=
PAYSTACK_SECRET_KEY=
EMAIL_USER=
EMAIL_PASS=
BASE_URL=

📡 API Documentation
Swagger Docs:
http://localhost:3000/api-docs

🌍 Live Demo
https://your-app-name.onrender.com

📸 Sample Flow

1. User initiates payment
2. Paystack webhook confirms payment
3. Ticket is created
4. QR code is generated
5. Email sent to user
6. Ticket verified via QR scan

🛡️ Security

- Paystack webhook signature validation
- Environment variable protection

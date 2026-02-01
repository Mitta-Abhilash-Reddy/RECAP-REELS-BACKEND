# 🚀 Recap Reels Backend

## 📌 Description
Recap Reels Backend is a production-ready Node.js and Express application built to capture leads from a website form.
It validates user input, stores lead data in Google Sheets for team visibility, and sends real-time WhatsApp notifications using Twilio.

The project follows clean backend architecture, centralized configuration, and structured logging practices suitable for real-world startups.

## ✨ Features

- ✅ Lead submission REST API
- ✅ Input validation middleware
- ✅ Auto-update Google Sheets (acts as lightweight CRM)
- ✅ One WhatsApp notification per lead (Twilio)
- ✅ Centralized configuration management
- ✅ Structured logging
- ✅ Clean, scalable folder structure
- ✅ Production-grade backend design

## 🛠 Tech Stack

- Node.js
- Express.js
- Google Sheets API
- Twilio WhatsApp API
- dotenv – environment variables
- Custom structured logger (no external logger dependency)

## 📁 Folder Structure
```
recap-reels-backend/
│
├── src/
│   ├── app.js                  # Application entry point
│   ├── config/
│   │   └── index.js             # Centralized configuration
│   ├── middlewares/
│   │   └── validateLead.js      # Request validation
│   ├── routes/
│   │   └── lead.routes.js       # Lead submission API
│   ├── services/
│   │   ├── googleSheet.js       # Google Sheets integration
│   │   └── whatsapp.js          # WhatsApp (Twilio) service
│   └── utils/
│       └── logger.js            # Structured logging utility
│
├── google-service-account.json  # (ignored in git)
├── .env                         # (ignored in git)
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Setup Instructions

1️⃣ **Clone the Repository**  
   ```bash
   git clone https://github.com/Mitta-Abhilash-Reddy/RECAP-REELS-BACKEND.git
   cd recap-reels-backend
   ```

2️⃣ **Install Dependencies**  
   ```bash
   npm install
   ```

3️⃣ **Environment Variables**  
   Create a `.env` file in the root directory:
   ```plaintext
   PORT=5000

   # Twilio WhatsApp
   TWILIO_SID=ACxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxx
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   TEAM_WHATSAPP_NUMBER=whatsapp:+91XXXXXXXXXX
   ```
   ⚠️ `.env` is intentionally excluded via `.gitignore`

4️⃣ **Google Sheets Setup**  
   - Create a Google Sheet named **Recap Reels Leads**  
   - Add the following headers in row 1:
     ```plaintext
     Date | Full Name | Business Email | Company Name | Phone Number | Project Details
     ```
   - Create a Google Cloud Service Account  
   - Download the JSON key file  
   - Rename it to:
     ```plaintext
     google-service-account.json
     ```
   - Place it in the project root  
   - Share the Google Sheet with the service account email (Editor access)  
   - Copy the Spreadsheet ID and configure it inside:
     ```plaintext
     src/services/googleSheet.js
     ```

5️⃣ **Run the Server**  
   ```bash
   npm run dev
   ```
   Server runs at:
   ```plaintext
   http://localhost:5000
   ```

## 📡 API Documentation

### 🔹 Submit Lead

**Endpoint**  
**POST** `/api/lead/submit`

### Request Body
```json
{
  "fullName": "Abhilash Reddy",
  "businessEmail": "abhi@recapreels.com",
  "companyName": "Recap Reels",
  "phoneNumber": "9876543210",
  "projectDetails": "Need Instagram reels for marketing"
}
```

### Success Response
```json
{
  "success": true,
  "message": "Details submitted successfully"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Validation error message"
}
```

## 🔁 Application Flow
- Frontend Form  
     ↓  
- Validation Middleware  
     ↓  
- Google Sheet (Append New Row)  
     ↓  
- WhatsApp Notification (Twilio)  
     ↓  
- API Response

## 🔐 Security Considerations
- Sensitive credentials are stored in environment variables  
- Service account keys and `.env` files are never committed  
- Only official APIs (Google & Twilio) are used

## ⚠️ Current Limitations
- WhatsApp uses Twilio Sandbox (testing mode)  
- Only sandbox-joined numbers can receive messages  
- No database backup (Google Sheets is primary storage)

## 🚀 Future Improvements
- MongoDB backup for leads  
- Admin dashboard for lead management  
- WhatsApp production approval  
- Rate limiting & monitoring  
- Authentication for admin APIs  
- Cloud deployment (Render / AWS)

## 👨‍💻 Author
- Recap Reels Backend Team

## ⭐ Final Note
This project is built as a real startup-grade MVP, following production practices rather than academic patterns.  
It can be safely extended to full-scale production with minimal changes.
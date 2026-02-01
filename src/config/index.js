require("dotenv").config();

module.exports = {
  server: {
    port: process.env.PORT || 5000
  },

  twilio: {
    sid: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to: process.env.TEAM_WHATSAPP_NUMBER
  }
};

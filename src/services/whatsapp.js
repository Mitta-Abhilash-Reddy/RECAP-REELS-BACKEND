const twilio = require("twilio");
const { twilio: twilioConfig } = require("../config");

const client = twilio(
  twilioConfig.sid,
  twilioConfig.authToken
);

async function sendWhatsAppMessage(lead) {
  const message = `\n📢 New Lead – Recap Reels\n\nName: ${lead.fullName}\nEmail: ${lead.businessEmail}\nCompany: ${lead.companyName}\nPhone: ${lead.phoneNumber}\nRequirement: ${lead.projectDetails || "N/A"}\n`;

  try {
    const resp = await client.messages.create({
      from: twilioConfig.from,
      to: twilioConfig.to,
      body: message
    });

    console.log("Twilio message sent, sid:", resp.sid);
    return resp;
  } catch (err) {
    console.error("Failed to send WhatsApp message via Twilio:", err && err.message ? err.message : err);
    throw err;
  }
}

module.exports = sendWhatsAppMessage;

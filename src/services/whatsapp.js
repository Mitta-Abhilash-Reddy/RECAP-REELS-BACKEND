const twilio = require("twilio");
const { twilio: twilioConfig } = require("../config");

const client = twilio(
  twilioConfig.sid,
  twilioConfig.authToken
);

async function sendWhatsAppMessage(lead) {
  const message = `
📢 New Lead – Recap Reels

Name: ${lead.fullName}
Email: ${lead.businessEmail}
Company: ${lead.companyName}
Phone: ${lead.phoneNumber}
Requirement: ${lead.projectDetails || "N/A"}
`;

  await client.messages.create({
    from: twilioConfig.from,
    to: twilioConfig.to,
    body: message
  });
}

module.exports = sendWhatsAppMessage;

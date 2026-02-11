const express = require("express");
const validateLead = require("../middlewares/validateLead");
const router = express.Router();

const appendLead = require("../services/googleSheet");
const sendWhatsAppMessage = require("../services/whatsapp");

router.post("/submit", validateLead, async (req, res) => {
  try {
    // 1️⃣ CRITICAL: Save lead to Google Sheet
    await appendLead(req.body);

    // 2️⃣ NON-CRITICAL: Send WhatsApp message
    // If this fails, user should NOT be affected
    try {
      await sendWhatsAppMessage(req.body);
    } catch (whatsappError) {
      console.error("WhatsApp failed:", whatsappError);
    }

    // 3️⃣ Always return success if sheet saved
    return res.status(200).json({
      success: true,
      message: "Details submitted successfully"
    });
  } catch (error) {
    console.error("Lead submit error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save details"
    });
  }
});


module.exports = router;

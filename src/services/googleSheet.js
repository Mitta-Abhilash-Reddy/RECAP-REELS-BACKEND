const { google } = require("googleapis");
const path = require("path");

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../../google-service-account.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const sheets = google.sheets({ version: "v4", auth });

// Prefer SPREADSHEET_ID from env for flexibility in different environments
const SPREADSHEET_ID = process.env.SPREADSHEET_ID || "1cxJeaDM-Ql9LGwRx8vi0SDwnIxNlhMZoU08s3_s1GoA";

async function appendLead(data) {
  const {
    fullName,
    businessEmail,
    companyName,
    phoneNumber,
    projectDetails
  } = data;

  const values = [[
    new Date().toLocaleString(),
    fullName,
    businessEmail,
    companyName,
    phoneNumber,
    projectDetails || ""
  ]];

  try {
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: { values }
    });

    console.log("Google Sheets append response:", res.status, res.statusText);
    return res;
  } catch (err) {
    console.error("Failed to append to Google Sheet:", err && err.message ? err.message : err);
    throw err;
  }
}

module.exports = appendLead;
    
const { google } = require("googleapis");
const path = require("path");

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../../google-service-account.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const sheets = google.sheets({ version: "v4", auth });

// 👇 PASTE YOUR SPREADSHEET ID HERE
const SPREADSHEET_ID = "1cxJeaDM-Ql9LGwRx8vi0SDwnIxNlhMZoU08s3_s1GoA";

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

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: { values }
  });
}

module.exports = appendLead;
    
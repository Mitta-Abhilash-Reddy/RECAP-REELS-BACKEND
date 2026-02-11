const { google } = require("googleapis");

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function appendLead(data) {
  const {
    fullName,
    businessEmail,
    companyName,
    phoneNumber,
    projectDetails
  } = data;

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: authClient });

  const values = [[
    new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata"
}),

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

    console.log("Google Sheets append success");
    return res;
  } catch (err) {
    console.error("Failed to append to Google Sheet:", err.message);
    throw err;
  }
}

module.exports = appendLead;

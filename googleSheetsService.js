const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Function to initialize Google Sheets API client
async function getGoogleSheetsClient() {
  try {
    // Check if credentials file exists
    const credentialsPath = path.join(__dirname, 'credentials.json');
    if (!fs.existsSync(credentialsPath)) {
      console.error('Error: credentials.json file not found');
      throw new Error('Credentials file not found');
    }
    
    // Create auth client
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    
    // Create and return sheets client
    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Failed to initialize Google Sheets client:', error);
    throw error;
  }
}

// Google Sheet ID - Replace with your actual spreadsheet ID
const spreadsheetId = '13loSkZK11WDgAcMld1680vOLXoU8RM2FbyBiNrxlRRY';

async function logConversationToGoogleSheet(data) {
  try {
    const sheets = await getGoogleSheetsClient();
    
    // Ensure all required fields have values
    const { 
      Modality = 'Chatbot', 
      CallTime, 
      PhoneNumber = 'NA', 
      CallOutcome, 
      BookingDate = 'NA', 
      BookingTime = 'NA', 
      CustomerName = 'Anonymous', 
      NumberOfGuests = 'NA', 
      CallSummary = 'No summary available'
    } = data;

    const values = [
      [Modality, CallTime, PhoneNumber, CallOutcome, BookingDate, BookingTime, CustomerName, NumberOfGuests, CallSummary]
    ];

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A2',
      valueInputOption: 'RAW',
      resource: {
        values,
      },
    });
    
    console.log(`${result.data.updates.updatedCells} cells updated`);
    return result;
  } catch (error) {
    console.error('Error logging to Google Sheet:', error);
    throw error;
  }
}

module.exports = { logConversationToGoogleSheet };
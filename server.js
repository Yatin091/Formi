const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { logConversationToGoogleSheet } = require('./googleSheetsService');
const states = require('./states');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chatbot.html'));
});

// API: Query Knowledge Base
app.post('/api/query', (req, res) => {
  const { location, type } = req.body;

  if (!location || !type) {
    return res.status(400).json({ error: 'Location and Type are required.' });
  }

  const response = knowledgeBase[location]?.[type];
  if (response) {
    return res.json({ response });
  } else {
    return res.status(404).json({ error: 'Information not found.' });
  }
});

// API: State Machine for Chatbot
app.post('/api/state-query', (req, res) => {
  const userMessage = req.body.message?.toLowerCase() || '';
  const currentState = req.body.currentState || 'INIT';
  
  console.log(`Received request: message="${userMessage}", currentState="${currentState}"`);
  
  if (!states[currentState]) {
    console.error(`Invalid state: ${currentState}`);
    return res.status(400).json({ error: 'Invalid state.' });
  }
  
  // Get next state based on user input and current state
  const nextState = states[currentState].next(userMessage);
  
  // Get the response message from the NEXT state, not the current state
  const response = states[nextState].message;
  
  console.log(`State transition: ${currentState} -> ${nextState} (message: "${userMessage}")`);
  
  res.json({ response, nextState });
});
  
// API: Log Conversation
app.post('/api/log', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate required fields
    if (!data.CallTime || !data.CallOutcome) {
      return res.status(400).json({ error: 'Missing required fields for logging.' });
    }
    
    await logConversationToGoogleSheet(data);
    res.json({ message: 'Conversation logged successfully.' });
  } catch (error) {
    console.error('Logging error:', error);
    res.status(500).json({ error: 'Failed to log conversation.' });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to interact with the chatbot`);
});
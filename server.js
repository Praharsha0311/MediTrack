const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

OPENAI_API_KEY='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';
const API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/chat', async (req, res) => {
  try {
    const messages = req.body.messages;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: messages
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('OpenAI error:', error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data || 'Something went wrong'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

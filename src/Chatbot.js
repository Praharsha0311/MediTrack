import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I am your Health Assistance Bot. How can I help you today with your health-related concern?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);

    try {
      // Add a system prompt at the start
      const geminiMessages = [
        {
          role: 'user',
          parts: [{
            text: `You are a friendly and supportive Health Assistance Bot.
Your job is to provide clear, concise, and easy-to-understand answers only related to health, medical, or emergency care queries (such as symptoms, first aid, basic medical advice, or guidance on whom to contact).
Your tone should be kind, calm, and reassuring — avoid sounding overly serious or robotic.
If a user asks anything unrelated to health, medical emergencies, or care, reply strictly with:

"I'm here to assist only with health-related queries. Please ask a health-related question."

⚠ Do not give lengthy explanations — keep answers short, focused, and practical.
⚠ Do not provide diagnoses or replace medical professionals. When in doubt, guide the user to contact a healthcare provider.
also remember, the pateints are from india. 911 doesnot work. For ambulance-contact 108 and police 100`
          }]
        },
        ...newMessages.map((m) => ({
          role: m.from === 'bot' ? 'model' : 'user',
          parts: [{ text: m.text }]
        }))
      ];

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=`,
        {
          contents: geminiMessages
        }
      );

      const botReply =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process that. Please ask a health-related question.";

      setMessages([...newMessages, { from: 'bot', text: botReply }]);
    } catch (err) {
      console.error('❌ API error:', err.response ? err.response.data : err.message);
      setMessages([...newMessages, { from: 'bot', text: 'Sorry, something went wrong.' }]);
    }

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <h2>Health Assistance Bot</h2>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.from}`}>
            <span className={`chatbot-bubble ${msg.from}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="chatbot-input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your health-related question"
        />
        <button onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;

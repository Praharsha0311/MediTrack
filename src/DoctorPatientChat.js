import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './DoctorPatientChat.css';  // Link the CSS file

const socket = io('ws://localhost:3500');

function DoctorPatientChat() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [activity, setActivity] = useState('');
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

  const chatRef = useRef();

  useEffect(() => {
    socket.on('message', (data) => {
      setActivity('');
      setMessages((prev) => [...prev, data]);
      scrollToBottom();
    });

    socket.on('activity', (name) => {
      setActivity(`${name} is typing...`);
      clearTimeout(window.activityTimer);
      window.activityTimer = setTimeout(() => setActivity(''), 3000);
    });

    socket.on('userList', ({ users }) => setUsers(users));
    socket.on('roomList', ({ rooms }) => setRooms(rooms));

    return () => {
      socket.off('message');
      socket.off('activity');
      socket.off('userList');
      socket.off('roomList');
    };
  }, []);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (name.trim() && room.trim()) {
      socket.emit('enterRoom', { name: name.trim(), room: room.trim() });
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('message', { name: name.trim(), text: input.trim() });
      setInput('');
    }
  };

  const handleTyping = () => {
    if (name.trim()) {
      socket.emit('activity', name.trim());
    }
  };

  return (
    <div className="chat-container">
      <h2>Doctor-Patient Chat</h2>

      <form onSubmit={handleJoin} className="join-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (Doctor/Patient)"
          required
        />
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Consultation ID / Room"
          required
        />
        <button type="submit">Join</button>
      </form>

      <div ref={chatRef} className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-bubble ${msg.name === name ? 'own' : 'other'}`}
          >
            <div className="chat-meta">
              <strong>{msg.name}</strong> <small>{msg.time}</small>
            </div>
            <div>{msg.text}</div>
          </div>
        ))}
      </div>

      <p className="chat-activity">{activity}</p>

      <form onSubmit={handleSend} className="input-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleTyping}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>

      <p><em>Users in room:</em> {users.map(u => u.name).join(', ')}</p>
      <p><em>Active rooms:</em> {rooms.join(', ')}</p>
    </div>
  );
}

export default DoctorPatientChat;

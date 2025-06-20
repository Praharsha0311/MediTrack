import React, { useState } from 'react';
import { db } from './firebase';
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './DoctorLogin.css';

function DoctorLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const snapshot = await get(ref(db, `doctors/${username}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.password === password) {
          if (onLogin) {
            onLogin(data);
          }
          navigate('/doc-dashboard');
        } else {
          alert('❌ Wrong password');
        }
      } else {
        alert('❌ Doctor not found');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Login failed');
    }
  };

  return (
    <div className="doctorlogin-container">
      <div className="doctorlogin-form">
        <h2>Doctor Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="doctorlogin-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="doctorlogin-input"
        />
        <button className="doctorlogin-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default DoctorLogin;

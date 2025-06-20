import React, { useState } from 'react';
import { db, ref, get } from './firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import spaceBg from './assets/test3.gif'; // Add the background GIF

function Login() {
  const [patientId, setPatientId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const snapshot = await get(ref(db, `patients/${patientId}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.password === password) {
          localStorage.setItem('patientId', patientId);
          navigate('/dashboard');
        } else {
          alert("❌ Invalid password");
        }
      } else {
        alert("❌ Patient ID not found");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Login error");
    }
  };

  return (
    <div className="login-container">
      <div 
        className="login-bg"
        style={{ backgroundImage: `url(${spaceBg})` }}
      ></div>

      <div className="login-form">
        <h2>Patient Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Patient ID (e.g. P001)"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

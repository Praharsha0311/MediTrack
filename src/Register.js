import React, { useState } from 'react';
import { db, ref, set, get } from './firebase';
import spaceBg from './assets/test3.gif';
import './Register.css';  // ✅ Import the new CSS

function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [patientId, setPatientId] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const snapshot = await get(ref(db, 'patients'));
      const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
      const newId = `P${String(count + 1).padStart(3, '0')}`;

      await set(ref(db, `patients/${newId}`), {
        name,
        password,
        monitoring: {
          temperature: "--",
          humidity: "--",
          motion: "--"
        }
      });

      setPatientId(newId);
      alert(`✅ Patient registered! ID: ${newId}`);
    } catch (error) {
      console.error(error);
      alert("❌ Error registering patient.");
    }
  };

  return (
    <div className="home-container">
      {/* Background image */}
      <div
        className="image-bg"
        style={{ backgroundImage: `url(${spaceBg})` }}
      ></div>

      <div className="content">
        <h2>Patient Registration</h2>
        
        <form onSubmit={handleRegister} className="space-form">
          <input
            type="text"
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="space-input"
          />
          <input
            type="password"
            placeholder="Set Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="space-input"
          />
          <button type="submit" className="space-button">Register</button>
        </form>

        {patientId && (
          <div className="patient-id-display">
            Your Patient ID: <span className="id-highlight">{patientId}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;

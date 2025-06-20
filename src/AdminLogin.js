import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (adminId === 'admin' && adminPass === 'password123') {
      navigate('/admin-dashboard');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="adminlogin-container">
      <style>{`
        .adminlogin-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #000;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .adminlogin-form {
          background: rgba(0, 0, 0, 0.7);
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(0, 195, 255, 0.5);
          text-align: center;
          width: 300px;
        }

        .adminlogin-form h2 {
          color: #00c3ff;
          margin-bottom: 20px;
        }

        .adminlogin-input {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: none;
          border-radius: 8px;
          background: #222;
          color: #fff;
          font-size: 1em;
        }

        .adminlogin-input::placeholder {
          color: #777;
        }

        .adminlogin-button {
          width: 100%;
          padding: 12px;
          background: #00c3ff;
          border: none;
          border-radius: 25px;
          color: #000;
          font-weight: bold;
          font-size: 1em;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .adminlogin-button:hover {
          background: #00a0cc;
          transform: scale(1.05);
        }

        .adminlogin-button:active {
          transform: scale(0.95);
        }
      `}</style>

      <div className="adminlogin-form">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          className="adminlogin-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={adminPass}
          onChange={(e) => setAdminPass(e.target.value)}
          className="adminlogin-input"
        />
        <button onClick={handleLogin} className="adminlogin-button">
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;

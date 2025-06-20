import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleUploadHealth = () => {
    navigate('/uploadhealth');
  };

  const handleMedicalHistory = () => {
    navigate('/healthcard');
  };

  return (
    <div className="admindashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-content">
        <button className="admindashboard-button" onClick={handleUploadHealth}>
          Upload Health
        </button>
        <button className="admindashboard-button" onClick={handleMedicalHistory}>
          Medical History
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;

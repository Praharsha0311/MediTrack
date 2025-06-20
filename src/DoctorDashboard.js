import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorDashboard.css';
import {Link} from 'react-router-dom'

function DoctorDashboard() {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/doctor-patient-chat');
  };

  return (
    <div className="dashboard-container">
      <div className="space-header">
        <div className="logo">MediTrack</div>
      </div>

      <div className="dashboard-content">
  <button className="space-button chat-button" onClick={handleChatClick}>
    Chat with Patient
  </button>
  <Link className="cta" to="/healthcard">
    Medical History
  </Link>
</div>
    </div>
  );
}

export default DoctorDashboard;

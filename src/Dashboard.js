import React, { useEffect, useState } from 'react';
import { db, ref, onValue } from './firebase';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const patientId = localStorage.getItem('patientId');

  useEffect(() => {
    if (!patientId) {
      alert("No patient logged in. Please login first.");
      navigate('/login');
      return;
    }

    const patientRef = ref(db, `patients/${patientId}/monitoring`);

    const unsubscribe = onValue(patientRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData(null);
      }
    });

    return () => unsubscribe();
  }, [patientId, navigate]);

  if (!patientId) {
    return (
      <div className="content">
        <h2>No patient logged in. Please login first.</h2>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="content">
        <h2>Patient Monitoring Data for {patientId}</h2>
        {data ? (
          <div className="monitor-cards">
            <div className="card temperature-card">
              <h3>🌡 Temperature</h3>
              <p>{data.temperature} °C</p>
            </div>
            <div className="card humidity-card">
              <h3>💧 Humidity</h3>
              <p>{data.humidity} %</p>
            </div>
            <div className="card motion-card">
              <h3>🚨 Motion</h3>
              <p>{data.motion}</p>
            </div>
          </div>
        ) : (
          <p>Loading monitoring data...</p>
        )}

        {/* Chat with Doctor button */}
        <div className="chat-button-container" style={{ marginTop: '20px' }}>
          <button
            className="space-button"
            onClick={() => navigate('/doctor-patient-chat')}
          >
            💬 Chat with Doctor
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

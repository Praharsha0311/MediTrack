import React, { useState } from 'react';
import { db } from './firebase';
import { ref, get } from 'firebase/database';
import './HealthCard.css';  // NEW: Add this CSS file

function HealthCard() {
  const [healthCardId, setHealthCardId] = useState('');
  const [history, setHistory] = useState(null);

  const fetchHistory = async (e) => {
    e.preventDefault();
    try {
      const snapshot = await get(ref(db, 'patients/' + healthCardId));
      if (snapshot.exists()) {
        setHistory(snapshot.val());
      } else {
        alert('No data found');
        setHistory(null);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Error fetching data');
    }
  };

  return (
    <div className="healthcard-container">
      <form onSubmit={fetchHistory} className="healthcard-form">
        <input
          type="text"
          placeholder="Enter Health Card ID"
          value={healthCardId}
          onChange={(e) => setHealthCardId(e.target.value)}
          className="healthcard-input"
        />
        <button type="submit" className="healthcard-button">Fetch History</button>
      </form>

      {history && (
        <div className="healthcard-history">
          <h3>Medical History</h3>
          <p><strong>Name:</strong> {history.Name}</p>
          <p><strong>Age:</strong> {history.age}</p>
          <p><strong>Gender:</strong> {history.gender}</p>

          {history.history ? (
            <table className="healthcard-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Diagnosis</th>
                  <th>Prescription</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(history.history).map(([date, details]) => (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>{details.diagnosis || '-'}</td>
                    <td>{details.prescription || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No history available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HealthCard;

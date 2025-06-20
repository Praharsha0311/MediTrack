import React, { useState } from 'react';
import { db } from './firebase';
import { ref, get, set, update } from 'firebase/database';
import './UploadHealth.css';  // Add your styles

function UploadHealth() {
  const [healthCardId, setHealthCardId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!healthCardId || !date) {
      alert('Health Card ID and Date of visit are required');
      return;
    }

    try {
      const patientRef = ref(db, 'patients/' + healthCardId);
      const snapshot = await get(patientRef);

      if (snapshot.exists()) {
        // Append visit data
        await update(patientRef, {
          [`history/${date}`]: {
            diagnosis,
            prescription
          }
        });
        alert('Visit data added successfully!');
      } else {
        // Create new patient record
        if (!name || !age || !gender) {
          alert('Name, Age, Gender required for new Health ID');
          return;
        }

        await set(patientRef, {
          Name: name,
          age: age,
          gender: gender,
          history: {
            [date]: {
              diagnosis,
              prescription
            }
          }
        });
        alert('New health record created successfully!');
      }

      // Clear form
      setName('');
      setAge('');
      setGender('');
      setDate('');
      setDiagnosis('');
      setPrescription('');

    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading data');
    }
  };

  return (
    <div className="uploadhealth-container">
      <h2>Upload Hospital Visit Data</h2>
      <form onSubmit={handleUpload} className="uploadhealth-form">
        <input
          type="text"
          placeholder="Health Card ID"
          value={healthCardId}
          onChange={(e) => setHealthCardId(e.target.value)}
          className="uploadhealth-input"
        />
        <input
          type="text"
          placeholder="Name (for new Health ID)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="uploadhealth-input"
        />
        <input
          type="text"
          placeholder="Age (for new Health ID)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="uploadhealth-input"
        />
        <input
          type="text"
          placeholder="Gender (for new Health ID)"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="uploadhealth-input"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="uploadhealth-input"
        />
        <input
          type="text"
          placeholder="Diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="uploadhealth-input"
        />
        <input
          type="text"
          placeholder="Prescription"
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
          className="uploadhealth-input"
        />
        <button type="submit" className="uploadhealth-button">Upload</button>
      </form>
    </div>
  );
}

export default UploadHealth;

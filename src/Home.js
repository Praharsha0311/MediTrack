import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
// import spaceBg from './assets/test3.gif'; // Your GIF background

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div 
        className="hero" 
      
      >
        <div className="overlay"></div>
        <header className="header">
          <div className="logo">MediTrack</div>
          <nav>
            {/* <a href="#about">About</a> */}
            <a href="/doc-login">Doctor</a>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/admin-login">Admin</Link>
          </nav>
        </header>

        <div className="hero-content">
          <h1>E-PMR: Emergency Patient Monitoring & Response</h1>
          <p>Real-time health monitoring for a safer tomorrow</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* <Link className="cta" to="#about">Learn More</Link> */}
            {/* <Link className="cta" to="/healthcard">Medical History</Link> */}
          </div>
        </div>
      </div>

      {/* <section id="about" className="container">
        <h2>About Our Project | <strong id="meditrack_id">MediTrack</strong></h2>
        <p>
          E-PMR System is designed to monitor patients in real-time, especially elderly individuals or patients living alone. 
          Using ESP32 microcontrollers with sensors (temperature, humidity, motion), our system pushes data to the cloud (Firebase) 
          and alerts caregivers through dashboards and buzzers during emergencies. We're building digital health cards that securely 
          store the patient’s medical history for quick access by partnered hospitals.
        </p>
      </section> */}

      {/* <section id="feedback" className="container">
        <h2>What Patients Say</h2>
        <div className="feedbacks">
          <div className="feedback">
            <p>"MediTrack gave my family peace of mind knowing I'm safe even when I'm home alone."</p>
            <span>- Ramesh, 67</span>
          </div>
          <div className="feedback">
            <p>"The alerts helped us act fast when my father fell. Truly life-saving!"</p>
            <span>- Priya, 35</span>
          </div>
          <div className="feedback">
            <p>"Easy to use and reliable. The digital health card made my hospital visit so smooth."</p>
            <span>- Anita, 52</span>
          </div>
        </div>
      </section> */}

      {/* <section id="partners" className="container">
        <h2>Our Hospital Partners</h2>
        <div className="partners">
          <div className="partner-card">Apollo Hospitals</div>
          <div className="partner-card">Fortis Healthcare</div>
          <div className="partner-card">Manipal Hospitals</div>
          <div className="partner-card">Local Clinics</div>
        </div>
      </section> */}

      {/* <footer>
        <p>© 2025 MediTrack | All Rights Reserved</p>
      </footer> */}

      {/* 💬 Chatbot floating button */}
      <button 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '30px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}
        onClick={() => navigate('/chat')}
        title="Chat with us"
      >
        💬
      </button>
    </div>
  );
};

export default Home;
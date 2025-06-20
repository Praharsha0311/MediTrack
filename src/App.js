import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Chatbot from "./Chatbot";
import DoctorPatientChat from "./DoctorPatientChat";
import HealthCard from "./HealthCard";
import DoctorLogin from "./DoctorLogin";
import UploadHealth from './UploadHealth';
import DoctorDashboard from "./DoctorDashboard";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";

function App() {
  // const [doctor, setDoctor] = useState(null);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/healthcard" element={<HealthCard />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/doctor-patient-chat" element={<DoctorPatientChat />} />
          <Route path="/doc-login" element={<DoctorLogin />} />
          <Route path="/doc-dashboard" element={<DoctorDashboard />} />
           <Route path="/uploadhealth" element={<UploadHealth />} />
           <Route path="/admin-login" element={<AdminLogin />} />
           <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

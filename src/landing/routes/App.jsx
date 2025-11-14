import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../Pages/home/Home';
import Login from '../Pages/login/Login'; 
import './App.css';
import PrivacyNoticePage from "../privacy-notice/page/Privaci";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/privacidad" element={<PrivacyNoticePage />} />
      </Routes>
    </Router>
  );
}

export default App;

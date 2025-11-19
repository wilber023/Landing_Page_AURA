import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from '../../admin/context/AuthContext';
import ProtectedRoute from '../../admin/components/ProtectedRoute';
import Layout from '../../admin/components/Layout';
import Home from '../Pages/home/Home';
import PrivacyNoticePage from "../privacy-notice/page/Privaci";
import Login from '../../admin/pages/Login';
import Dashboard from '../../admin/pages/Dashboard';
import Alertas from '../../admin/pages/Alertas';
import Usuarios from '../../admin/pages/Usuarios';
import Analiticas from '../../admin/pages/Analiticas';
import './App.css'; 
import Feed from "../../admin/pages/feed";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/privacidad" element={<PrivacyNoticePage />} />
          <Route path="/acceso-feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="alertas" element={<Alertas />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="analiticas" element={<Analiticas />} />
          </Route>xº
          <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
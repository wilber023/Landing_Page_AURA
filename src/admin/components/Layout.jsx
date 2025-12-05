import { useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Activity, LayoutDashboard, Users, AlertTriangle, BarChart3, LogOut, User as UserIcon, ScatterChart, Database } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

const navItems = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/usuarios', icon: Users, label: 'Usuarios' },
  { to: '/app/visualizaciones', icon: ScatterChart, label: 'Visualizaciones' },
  { to: '/app/etl', icon: Database, label: 'ETL & Clustering' },
  { to: '/app/alertas', icon: AlertTriangle, label: 'Alertas' },
  { to: '/app/analiticas', icon: BarChart3, label: 'Analíticas' },
];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header con logo, tabs y user info */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ padding: '1rem 2rem' }}>
          {/* Top bar: Logo y User */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ backgroundColor: '#0ea5e9', borderRadius: '0.5rem', padding: '0.5rem' }}>
                <Activity style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0ea5e9', margin: 0 }}>AURA</h1>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>Admin Panel</p>
              </div>
            </div>

            {/* User menu */}
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', cursor: 'pointer' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserIcon style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>{user?.name}</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Title and subtitle */}
          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, marginBottom: '0.25rem' }}>Panel de Administración AURA</h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>Sistema de monitoreo y respuesta a crisis emocionales</p>
          </div>

          {/* Navigation tabs horizontal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  backgroundColor: isActive ? '#0ea5e9' : 'transparent',
                  color: isActive ? 'white' : '#64748b',
                  transition: 'all 0.2s'
                })}
              >
                <item.icon style={{ width: '1rem', height: '1rem' }} />
                {item.label}
              </NavLink>
            ))}

            {/* Botón de logout */}
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
                backgroundColor: 'transparent',
                color: '#64748b',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                marginLeft: 'auto',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fef2f2';
                e.currentTarget.style.borderColor = '#fca5a5';
                e.currentTarget.style.color = '#dc2626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              <LogOut style={{ width: '1rem', height: '1rem' }} />
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
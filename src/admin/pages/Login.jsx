import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Loader2, Mail, Lock } from 'lucide-react';
import { Input } from '../components/ui/input';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      padding: '1rem'
    }}>
      
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '2.5rem',
        border: '1px solid #e2e8f0'
      }}>
        
   
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            backgroundColor: '#0ea5e9',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <Activity style={{ width: '2rem', height: '2rem', color: 'white' }} />
          </div>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#1e293b',
            margin: '0 0 0.25rem 0'
          }}>
            Panel de Administración
          </h1>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#64748b',
            margin: 0
          }}>
            Sistema de monitoreo AURA
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Email */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              marginBottom: '0.5rem', 
              color: '#1e293b',
              textAlign: 'left'
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ 
                position: 'absolute', 
                left: '0.875rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                width: '1.125rem', 
                height: '1.125rem', 
                color: '#94a3b8' 
              }} />
              <Input
                type="email"
                placeholder="admin@aura.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                style={{ 
                  paddingLeft: '2.75rem', 
                  height: '2.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  width: '100%'
                }}
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              marginBottom: '0.5rem', 
              color: '#1e293b',
              textAlign: 'left'
            }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ 
                position: 'absolute', 
                left: '0.875rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                width: '1.125rem', 
                height: '1.125rem', 
                color: '#94a3b8' 
              }} />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                style={{ 
                  paddingLeft: '2.75rem', 
                  height: '2.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  width: '100%'
                }}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#dc2626',
              fontSize: '0.875rem',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              height: '2.75rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              backgroundColor: loading ? '#94a3b8' : '#0ea5e9',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#0284c7';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#0ea5e9';
            }}
          >
            {loading ? (
              <>
                <Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>

          {/* Credenciales de prueba */}
          <div style={{ textAlign: 'center', paddingTop: '0.5rem', borderTop: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
              <Link to={"/home"}>Ir a la página de inicio</Link>
            </p>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.25rem',
              backgroundColor: '#f8fafc',
              padding: '0.75rem',
              borderRadius: '0.5rem'
            }}>
              <p style={{ 
                fontFamily: 'monospace', 
                fontSize: '0.813rem', 
                color: '#0ea5e9',
                margin: 0,
                fontWeight: '500'
              }}>
                admin@aura.com
              </p>
              <p style={{ 
                fontFamily: 'monospace', 
                fontSize: '0.813rem', 
                color: '#0ea5e9',
                margin: 0,
                fontWeight: '500'
              }}>
                admin123
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
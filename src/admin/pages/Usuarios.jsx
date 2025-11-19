import { useState } from 'react';
import { Users, Activity, AlertTriangle, CheckCircle, Search, TrendingUp, TrendingDown, MapPin, MessageSquare, Clock, Shield, Heart, Phone, Eye, User as UserIcon } from 'lucide-react';

export default function Usuarios() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const usuarios = [
    { 
      id: '#1843', 
      edad: 17, 
      ciudad: 'CDMX', 
      riesgo: 'high', 
      score: 85, 
      tendencia: -15, 
      conversaciones: 47,
      alertas: 3,
      ultimaAlerta: '2 días',
      temasRecurrentes: ['ansiedad', 'soledad', 'autoestima'],
      intervenciones: [
        { fecha: '2025-10-21', tipo: 'Seguimiento especial asignado', resultado: 'Positivo' },
        { fecha: '2025-10-18', tipo: 'Llamada de emergencia', resultado: 'Estabilizado' }
      ]
    },
    { 
      id: '#2457', 
      edad: 22, 
      ciudad: 'Guadalajara', 
      riesgo: 'medium', 
      score: 58, 
      tendencia: 5, 
      conversaciones: 89,
      alertas: 1,
      ultimaAlerta: '1 semana',
      temasRecurrentes: ['trabajo', 'estrés', 'relaciones'],
      intervenciones: [
        { fecha: '2025-10-16', tipo: 'Seguimiento rutinario', resultado: 'Mejorando' }
      ]
    },
    { 
      id: '#1547', 
      edad: 20, 
      ciudad: 'Monterrey', 
      riesgo: 'low', 
      score: 32, 
      tendencia: 12, 
      conversaciones: 124,
      alertas: 0,
      ultimaAlerta: 'Nunca',
      temasRecurrentes: ['crecimiento personal', 'metas', 'bienestar'],
      intervenciones: []
    },
    { 
      id: '#3021', 
      edad: 19, 
      ciudad: 'Puebla', 
      riesgo: 'high', 
      score: 78, 
      tendencia: -8, 
      conversaciones: 56,
      alertas: 2,
      ultimaAlerta: '3 días',
      temasRecurrentes: ['depresión', 'familia', 'universidad'],
      intervenciones: [
        { fecha: '2025-10-20', tipo: 'Derivado a psicólogo', resultado: 'En proceso' }
      ]
    },
    { 
      id: '#2789', 
      edad: 24, 
      ciudad: 'Querétaro', 
      riesgo: 'medium', 
      score: 52, 
      tendencia: 3, 
      conversaciones: 67,
      alertas: 1,
      ultimaAlerta: '2 semanas',
      temasRecurrentes: ['ansiedad', 'cambios', 'futuro'],
      intervenciones: [
        { fecha: '2025-10-08', tipo: 'Seguimiento por chat', resultado: 'Útil' }
      ]
    },
  ];

  const getRiskBadge = (riesgo) => {
    switch (riesgo) {
      case 'high':
        return { text: 'Riesgo Alto', bg: '#dc2626' };
      case 'medium':
        return { text: 'Riesgo Medio', bg: '#f59e0b' };
      default:
        return { text: 'Estable', bg: '#16a34a' };
    }
  };

  const getRiskColor = (score) => {
    if (score >= 70) return '#dc2626';
    if (score >= 50) return '#ea580c';
    if (score >= 30) return '#f59e0b';
    return '#16a34a';
  };

  const filteredUsers = usuarios.filter(user =>
    user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.ciudad.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', backgroundColor: 'rgba(241, 245, 249, 0.3)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Gestión de Usuarios</h1>
        <p style={{ color: '#64748b' }}>Seguimiento individual y análisis</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '1.5rem' }}>
        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Total Usuarios</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>1,247</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Registrados</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Activos Hoy</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>892</div>
            <p style={{ fontSize: '0.75rem', color: '#0ea5e9' }}>71.5% del total</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #ea580c' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>En Riesgo</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#ea580c' }}>156</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Requieren seguimiento</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Estables</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#0ea5e9' }}>1,091</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>87.5% del total</p>
          </div>
        </div>
      </div>

      {/* Buscador y Lista */}
      <div className="card">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Lista de Usuarios</h3>
            <div style={{ position: 'relative', width: '16rem' }}>
              <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#64748b' }} />
              <input
                className="input"
                placeholder="Buscar por ID o ciudad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
        </div>

        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredUsers.map((usuario) => {
            const badge = getRiskBadge(usuario.riesgo);
            
            return (
              <div
                key={usuario.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  backgroundColor: 'rgba(241, 245, 249, 0.5)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(241, 245, 249, 0.8)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(241, 245, 249, 0.5)'}
                onClick={() => {
                  setSelectedUser(usuario);
                  setShowModal(true);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users style={{ width: '1.5rem', height: '1.5rem', color: '#0ea5e9' }} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: '600' }}>{usuario.id}</span>
                      <span className="badge" style={{ backgroundColor: badge.bg, color: 'white' }}>
                        {badge.text}
                      </span>
                      <span className="badge badge-outline">Score: {usuario.score}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
                      <span>{usuario.edad} años</span>
                      <span>•</span>
                      <span>{usuario.ciudad}</span>
                      <span>•</span>
                      <span>{usuario.conversaciones} conversaciones</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {usuario.tendencia > 0 ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#16a34a' }}>
                        <TrendingUp style={{ width: '1rem', height: '1rem' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>+{usuario.tendencia}%</span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#dc2626' }}>
                        <TrendingDown style={{ width: '1rem', height: '1rem' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{usuario.tendencia}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de detalles */}
      {showModal && selectedUser && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }} onClick={() => setShowModal(false)}>
          <div className="card" style={{
            maxWidth: '56rem',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Historial Completo - Usuario {selectedUser.id}</h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Seguimiento individual y análisis de caso (Anónimo)</p>
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              {/* Perfil */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', backgroundColor: 'rgba(241, 245, 249, 0.5)', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', backgroundColor: 'rgba(14, 165, 233, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserIcon style={{ width: '2.5rem', height: '2.5rem', color: '#0ea5e9' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{selectedUser.id}</h3>
                    <span className="badge" style={{ backgroundColor: getRiskBadge(selectedUser.riesgo).bg, color: 'white' }}>
                      {getRiskBadge(selectedUser.riesgo).text}
                    </span>
                    <span className="badge badge-outline" style={{ color: getRiskColor(selectedUser.score), borderColor: getRiskColor(selectedUser.score) }}>
                      Score: {selectedUser.score}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', fontSize: '0.875rem' }}>
                    <div>
                      <span style={{ color: '#64748b' }}>Edad: </span>
                      {selectedUser.edad} años
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Ciudad: </span>
                      {selectedUser.ciudad}
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Conversaciones: </span>
                      {selectedUser.conversaciones}
                    </div>
                  </div>
                </div>
              </div>

              {/* Métricas */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="card">
                  <div style={{ padding: '1rem', textAlign: 'center' }}>
                    <MessageSquare style={{ width: '2rem', height: '2rem', color: '#0ea5e9', margin: '0 auto 0.5rem' }} />
                    <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{selectedUser.conversaciones}</p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Conversaciones</p>
                  </div>
                </div>
                <div className="card">
                  <div style={{ padding: '1rem', textAlign: 'center' }}>
                    <AlertTriangle style={{ width: '2rem', height: '2rem', color: '#ea580c', margin: '0 auto 0.5rem' }} />
                    <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{selectedUser.alertas}</p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Alertas totales</p>
                  </div>
                </div>
                <div className="card">
                  <div style={{ padding: '1rem', textAlign: 'center' }}>
                    <Shield style={{ width: '2rem', height: '2rem', color: '#0ea5e9', margin: '0 auto 0.5rem' }} />
                    <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{selectedUser.intervenciones.length}</p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Intervenciones</p>
                  </div>
                </div>
                <div className="card">
                  <div style={{ padding: '1rem', textAlign: 'center' }}>
                    {selectedUser.tendencia > 0 ? (
                      <TrendingUp style={{ width: '2rem', height: '2rem', color: '#16a34a', margin: '0 auto 0.5rem' }} />
                    ) : (
                      <TrendingDown style={{ width: '2rem', height: '2rem', color: '#dc2626', margin: '0 auto 0.5rem' }} />
                    )}
                    <p style={{ fontSize: '1.5rem', fontWeight: '700', color: selectedUser.tendencia > 0 ? '#16a34a' : '#dc2626' }}>
                      {selectedUser.tendencia > 0 ? '+' : ''}{selectedUser.tendencia}%
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Tendencia</p>
                  </div>
                </div>
              </div>

              {/* Temas recurrentes */}
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontWeight: '600' }}>Temas Más Discutidos con la IA</h4>
                </div>
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedUser.temasRecurrentes.map((tema, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'rgba(241, 245, 249, 0.5)', borderRadius: '0.375rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>
                          {idx + 1}
                        </div>
                        <span style={{ textTransform: 'capitalize' }}>{tema}</span>
                      </div>
                      <span className="badge badge-secondary">
                        {Math.floor(Math.random() * 20) + 10} menciones
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historial de intervenciones */}
              <div className="card">
                <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontWeight: '600' }}>Historial de Intervenciones</h4>
                </div>
                <div style={{ padding: '1rem' }}>
                  {selectedUser.intervenciones.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {selectedUser.intervenciones.map((intervencion, idx) => (
                        <div key={idx} style={{ padding: '1rem', borderLeft: '4px solid #0ea5e9', backgroundColor: 'rgba(14, 165, 233, 0.05)', borderRadius: '0.375rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{intervencion.tipo}</p>
                              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{intervencion.fecha}</p>
                            </div>
                            <span className="badge badge-primary">{intervencion.resultado}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '2rem 0', color: '#64748b' }}>
                      No hay intervenciones registradas aún
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
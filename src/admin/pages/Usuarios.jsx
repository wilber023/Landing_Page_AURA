import { useState, useEffect } from 'react';
import { Users, Activity, Search, TrendingUp, TrendingDown, MessageSquare, AlertTriangle, Shield } from 'lucide-react';

export default function Usuarios() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    activeToday: 0,
    activeTodayPercentage: 0,
    atRisk: 0,
    stable: 0,
    stablePercentage: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsuarios();
    fetchStats();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      // TODO: Reemplazar con endpoint real
      // const response = await fetch('/api/usuarios');
      // const data = await response.json();
      // setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // TODO: Reemplazar con endpoint real
      // const response = await fetch('/api/usuarios/estadisticas');
      // const data = await response.json();
      // setStats(data);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      // TODO: Reemplazar con endpoint real
      // const response = await fetch(`/api/usuarios/${userId}/detalles`);
      // const data = await response.json();
      // setSelectedUser(data);
      // setShowModal(true);
    } catch (error) {
      console.error('Error al cargar detalles del usuario:', error);
    }
  };

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
    user.ciudad?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#64748b' }}>Cargando usuarios...</p>
      </div>
    );
  }

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
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>{stats.total}</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Registrados</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Activos Hoy</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>{stats.activeToday}</div>
            <p style={{ fontSize: '0.75rem', color: '#0ea5e9' }}>{stats.activeTodayPercentage}% del total</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #ea580c' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>En Riesgo</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#ea580c' }}>{stats.atRisk}</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Requieren seguimiento</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Estables</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#0ea5e9' }}>{stats.stable}</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{stats.stablePercentage}% del total</p>
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

        <div style={{ padding: '1.5rem' }}>
          {filteredUsers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#64748b' }}>
              <Users style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem', color: '#94a3b8' }} />
              <p>No se encontraron usuarios</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
                    onClick={() => fetchUserDetails(usuario.id)}
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
          )}
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
                  <Users style={{ width: '2.5rem', height: '2.5rem', color: '#0ea5e9' }} />
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
                    <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{selectedUser.intervenciones?.length || 0}</p>
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
              {selectedUser.temasRecurrentes && selectedUser.temasRecurrentes.length > 0 && (
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
                          <span style={{ textTransform: 'capitalize' }}>{tema.nombre}</span>
                        </div>
                        <span className="badge badge-secondary">
                          {tema.menciones} menciones
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Historial de intervenciones */}
              <div className="card">
                <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontWeight: '600' }}>Historial de Intervenciones</h4>
                </div>
                <div style={{ padding: '1rem' }}>
                  {!selectedUser.intervenciones || selectedUser.intervenciones.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0', color: '#64748b' }}>
                      <Shield style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem', color: '#94a3b8' }} />
                      <p>No hay intervenciones registradas aún</p>
                    </div>
                  ) : (
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
import { useState, useEffect } from 'react';
import { AlertTriangle, Eye, Shield, Clock, MapPin, User, Zap, CheckCircle, MessageSquare } from 'lucide-react';

export default function Alertas() {
  const [selectedTab, setSelectedTab] = useState('critical');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alertas, setAlertas] = useState([]);
  const [alertasMonitoreo, setAlertasMonitoreo] = useState([]);
  const [stats, setStats] = useState({
    critical: 0,
    high: 0,
    monitoring: 0,
    resolved: 0,
    successRate: 0,
    avgResponseTime: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlertas();
    fetchStats();
  }, []);

  const fetchAlertas = async () => {
    try {
      setLoading(true);
      // TODO: Reemplazar con endpoint real
      // const response = await fetch('/api/alertas/criticas-y-altas');
      // const data = await response.json();
      // setAlertas(data);
      
      // const responseMonitoreo = await fetch('/api/alertas/monitoreo');
      // const dataMonitoreo = await responseMonitoreo.json();
      // setAlertasMonitoreo(dataMonitoreo);
    } catch (error) {
      console.error('Error al cargar alertas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // TODO: Reemplazar con endpoint real
      // const response = await fetch('/api/alertas/estadisticas');
      // const data = await response.json();
      // setStats(data);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return { border: '#dc2626', bg: 'rgba(220, 38, 38, 0.05)' };
      case 'high': return { border: '#ea580c', bg: 'rgba(234, 88, 12, 0.05)' };
      default: return { border: '#f59e0b', bg: 'rgba(245, 158, 11, 0.05)' };
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical': return { text: 'CRÍTICO', bg: '#dc2626' };
      case 'high': return { text: 'ALTO', bg: '#ea580c' };
      default: return { text: 'MEDIO', bg: '#f59e0b' };
    }
  };

  const getRiskColor = (score) => {
    if (score >= 80) return '#dc2626';
    if (score >= 60) return '#ea580c';
    return '#f59e0b';
  };

  const handleIntervenir = async (alertaId) => {
    try {
      // TODO: Implementar endpoint
      // await fetch(`/api/alertas/${alertaId}/intervenir`, { method: 'POST' });
      // fetchAlertas();
      alert('Intervención iniciada');
    } catch (error) {
      console.error('Error al iniciar intervención:', error);
    }
  };

  const handleVerDetalles = (alerta) => {
    setSelectedAlert(alerta);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#64748b' }}>Cargando alertas...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: 'rgba(241, 245, 249, 0.3)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Sistema de Alertas</h1>
        <p style={{ color: '#64748b' }}>Monitoreo y respuesta a crisis emocionales</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '1.5rem' }}>
        <div className="card" style={{ borderLeft: '4px solid #dc2626' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Alertas Críticas</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#dc2626' }}>{stats.critical}</div>
            <p style={{ fontSize: '0.75rem', color: '#dc2626' }}>ACCIÓN INMEDIATA</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #ea580c' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Alertas Altas</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#ea580c' }}>{stats.high}</div>
            <p style={{ fontSize: '0.75rem', color: '#ea580c' }}>Atención urgente</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>En Monitoreo</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#f59e0b' }}>{stats.monitoring}</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Seguimiento activo</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Resueltas Hoy</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#0ea5e9' }}>{stats.resolved}</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Tasa: {stats.successRate}%</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'inline-flex', height: '2.5rem', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', backgroundColor: '#f1f5f9', padding: '0.25rem' }}>
          <button
            onClick={() => setSelectedTab('critical')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.375rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: selectedTab === 'critical' ? 'white' : 'transparent',
              color: selectedTab === 'critical' ? '#1e293b' : '#64748b',
              boxShadow: selectedTab === 'critical' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              gap: '0.5rem'
            }}
          >
            <AlertTriangle style={{ width: '1rem', height: '1rem' }} />
            Críticas y Altas ({alertas.length})
          </button>
          <button
            onClick={() => setSelectedTab('monitoring')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.375rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: selectedTab === 'monitoring' ? 'white' : 'transparent',
              color: selectedTab === 'monitoring' ? '#1e293b' : '#64748b',
              boxShadow: selectedTab === 'monitoring' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              gap: '0.5rem'
            }}
          >
            <Eye style={{ width: '1rem', height: '1rem' }} />
            Monitoreo ({alertasMonitoreo.length})
          </button>
          <button
            onClick={() => setSelectedTab('resolved')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.375rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: selectedTab === 'resolved' ? 'white' : 'transparent',
              color: selectedTab === 'resolved' ? '#1e293b' : '#64748b',
              boxShadow: selectedTab === 'resolved' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              gap: '0.5rem'
            }}
          >
            <CheckCircle style={{ width: '1rem', height: '1rem' }} />
            Resueltas Hoy
          </button>
        </div>
      </div>

      {/* Contenido de Tabs */}
      {selectedTab === 'critical' && (
        <div className="card">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle style={{ width: '1.25rem', height: '1.25rem' }} />
              Requiere Atención Inmediata
            </h3>
          </div>
          <div style={{ padding: '1.5rem' }}>
            {alertas.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: '#64748b' }}>
                <AlertTriangle style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem', color: '#94a3b8' }} />
                <p>No hay alertas críticas en este momento</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {alertas.map((alerta) => {
                  const colors = getSeverityColor(alerta.severidad);
                  const badge = getSeverityBadge(alerta.severidad);
                  
                  return (
                    <div
                      key={alerta.id}
                      style={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        borderLeft: `4px solid ${colors.border}`,
                        backgroundColor: colors.bg,
                        cursor: 'pointer'
                      }}
                      onClick={() => handleVerDetalles(alerta)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                            <h3 style={{ fontWeight: '600' }}>Usuario {alerta.userId}</h3>
                            <span className="badge" style={{ backgroundColor: badge.bg, color: 'white' }}>{badge.text}</span>
                            <span className="badge badge-outline" style={{ color: getRiskColor(alerta.riesgo), borderColor: getRiskColor(alerta.riesgo) }}>
                              Riesgo: {alerta.riesgo}%
                            </span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b', marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <User style={{ width: '0.75rem', height: '0.75rem' }} />
                              {alerta.edad} años
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <MapPin style={{ width: '0.75rem', height: '0.75rem' }} />
                              {alerta.ciudad}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Clock style={{ width: '0.75rem', height: '0.75rem' }} />
                              {alerta.tiempo}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <AlertTriangle style={{ width: '0.75rem', height: '0.75rem' }} />
                              {alerta.alertasPrevias} alertas previas
                            </div>
                          </div>

                          <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                            <strong>Gatillo:</strong> {alerta.trigger}
                          </p>

                          {alerta.frases && alerta.frases.length > 0 && (
                            <div style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: '0.375rem', border: '1px solid #e2e8f0' }}>
                              <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Frases detectadas por IA:</p>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                                {alerta.frases.map((frase, idx) => (
                                  <span key={idx} className="badge badge-secondary" style={{ fontSize: '0.75rem' }}>
                                    "{frase}"
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem' }}>
                          <button
                            className="btn"
                            style={{ 
                              backgroundColor: alerta.estado === 'pending' ? '#dc2626' : '#0ea5e9',
                              color: 'white',
                              padding: '0.5rem 0.75rem',
                              fontSize: '0.875rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              whiteSpace: 'nowrap'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIntervenir(alerta.id);
                            }}
                          >
                            <Zap style={{ width: '1rem', height: '1rem' }} />
                            {alerta.estado === 'pending' ? 'Intervenir' : 'Seguimiento'}
                          </button>
                          <button
                            className="btn btn-outline"
                            style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem', whiteSpace: 'nowrap' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVerDetalles(alerta);
                            }}
                          >
                            Ver detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTab === 'monitoring' && (
        <div className="card">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye style={{ width: '1.25rem', height: '1.25rem', color: '#f59e0b' }} />
              Usuarios en Monitoreo - Seguimiento Activo
            </h3>
          </div>
          <div style={{ padding: '1.5rem' }}>
            {alertasMonitoreo.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: '#64748b' }}>
                <Eye style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem', color: '#94a3b8' }} />
                <p>No hay usuarios en monitoreo actualmente</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {alertasMonitoreo.map((alerta) => {
                  const colors = getSeverityColor(alerta.severidad);
                  const badge = getSeverityBadge(alerta.severidad);
                  
                  return (
                    <div
                      key={alerta.id}
                      style={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        borderLeft: `4px solid ${colors.border}`,
                        backgroundColor: colors.bg
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <h3 style={{ fontWeight: '600' }}>Usuario {alerta.userId}</h3>
                            <span className="badge" style={{ backgroundColor: badge.bg, color: 'white' }}>{badge.text}</span>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                            <div>{alerta.edad} años</div>
                            <div>{alerta.ciudad}</div>
                          </div>
                          <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                            <strong>Patrón:</strong> {alerta.trigger}
                          </p>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            Última intervención: {alerta.ultimaIntervencion} • {alerta.alertasPrevias} alertas previas
                          </div>
                        </div>
                        <button className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}>
                          Ver historial
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTab === 'resolved' && (
        <div className="card">
          <div style={{ padding: '1.5rem' }}>
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <CheckCircle style={{ width: '4rem', height: '4rem', color: '#0ea5e9', margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{stats.resolved} Alertas Resueltas Hoy</h3>
              <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                Tasa de intervención exitosa: <span style={{ color: '#0ea5e9', fontWeight: '600' }}>{stats.successRate}%</span>
              </p>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Tiempo promedio de respuesta: <span style={{ color: '#0ea5e9', fontWeight: '600' }}>{stats.avgResponseTime} min</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalles */}
      {showModal && selectedAlert && (
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
            maxWidth: '42rem',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Detalles de la Alerta - Usuario {selectedAlert.userId}</h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Información completa de la crisis detectada por IA</p>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Severidad</p>
                  <span className="badge" style={{ backgroundColor: getSeverityBadge(selectedAlert.severidad).bg, color: 'white' }}>
                    {getSeverityBadge(selectedAlert.severidad).text}
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Nivel de riesgo</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: '700', color: getRiskColor(selectedAlert.riesgo) }}>
                    {selectedAlert.riesgo}%
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Edad</p>
                  <p>{selectedAlert.edad} años</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Ubicación</p>
                  <p>{selectedAlert.ciudad}</p>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Gatillo detectado</p>
                <p style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.375rem' }}>{selectedAlert.trigger}</p>
              </div>

              {selectedAlert.frases && selectedAlert.frases.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Frases que activaron la alerta</p>
                  <div style={{ padding: '0.75rem', backgroundColor: 'rgba(220, 38, 38, 0.05)', border: '1px solid rgba(220, 38, 38, 0.2)', borderRadius: '0.375rem' }}>
                    {selectedAlert.frases.map((frase, idx) => (
                      <p key={idx} style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>• "{frase}"</p>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>
                  Cerrar
                </button>
                <button 
                  className="btn" 
                  style={{ flex: 1, backgroundColor: '#ea580c', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  onClick={() => handleIntervenir(selectedAlert.id)}
                >
                  <Zap style={{ width: '1rem', height: '1rem' }} />
                  Iniciar Intervención
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
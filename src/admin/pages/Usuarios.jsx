import { useState, useEffect } from 'react';
import { Users, Activity, Search, AlertTriangle, Shield, RefreshCw, Eye } from 'lucide-react';
import { clusteringAPI } from '../api/clustering';

export default function Usuarios() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');
  const [usuarios, setUsuarios] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    highRisk: 0,
    moderateRisk: 0,
    lowRisk: 0
  });
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);

      // Obtener usuarios de todos los niveles de riesgo
      const [highRisk, moderateRisk, lowRisk] = await Promise.all([
        clusteringAPI.getUsersByRisk('ALTO_RIESGO'),
        clusteringAPI.getUsersByRisk('RIESGO_MODERADO'),
        clusteringAPI.getUsersByRisk('BAJO_RIESGO'),
      ]);

      // Agregar el nivel de riesgo a cada usuario
      const allUsers = [
        ...highRisk.map(u => ({ ...u, risk_category: 'ALTO_RIESGO' })),
        ...moderateRisk.map(u => ({ ...u, risk_category: 'RIESGO_MODERADO' })),
        ...lowRisk.map(u => ({ ...u, risk_category: 'BAJO_RIESGO' })),
      ];

      setUsuarios(allUsers);

      setStats({
        total: allUsers.length,
        highRisk: highRisk.length,
        moderateRisk: moderateRisk.length,
        lowRisk: lowRisk.length
      });

    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      setLoadingDetails(true);
      const profile = await clusteringAPI.getUserProfile(userId);
      setSelectedUser(profile);
      setShowModal(true);
    } catch (error) {
      console.error('Error al cargar detalles del usuario:', error);
      alert('Error al cargar detalles del usuario: ' + error.message);
    } finally {
      setLoadingDetails(false);
    }
  };

  const getRiskBadge = (riskLevel) => {
    switch (riskLevel) {
      case 'ALTO_RIESGO':
        return { text: 'Alto Riesgo', bg: '#dc2626', textColor: 'white' };
      case 'RIESGO_MODERADO':
        return { text: 'Riesgo Moderado', bg: '#f59e0b', textColor: 'white' };
      case 'BAJO_RIESGO':
        return { text: 'Bajo Riesgo', bg: '#16a34a', textColor: 'white' };
      default:
        return { text: 'Desconocido', bg: '#64748b', textColor: 'white' };
    }
  };

  const getRiskColor = (severityIndex) => {
    if (severityIndex >= 0.7) return '#dc2626';
    if (severityIndex >= 0.5) return '#ea580c';
    if (severityIndex >= 0.3) return '#f59e0b';
    return '#16a34a';
  };

  const filteredUsers = usuarios.filter(user => {
    const matchesSearch = user.user_id_raiz?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = selectedRiskFilter === 'ALL' || user.risk_category === selectedRiskFilter;
    return matchesSearch && matchesRisk;
  });

  if (loading) {
    return (
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#64748b' }}>Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: 'rgba(241, 245, 249, 0.3)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Gestión de Usuarios</h1>
          <p style={{ color: '#64748b' }}>Seguimiento individual y análisis de riesgo</p>
        </div>
        <button
          onClick={fetchUsuarios}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0ea5e9',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          <RefreshCw style={{ width: '1rem', height: '1rem' }} />
          Actualizar
        </button>
      </div>

      {/* Estadísticas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Total Usuarios</span>
            <Users style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>{stats.total}</div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #dc2626' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Alto Riesgo</span>
            <AlertTriangle style={{ width: '1.25rem', height: '1.25rem', color: '#dc2626' }} />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#dc2626' }}>{stats.highRisk}</div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Riesgo Moderado</span>
            <Activity style={{ width: '1.25rem', height: '1.25rem', color: '#f59e0b' }} />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#f59e0b' }}>{stats.moderateRisk}</div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Bajo Riesgo</span>
            <Shield style={{ width: '1.25rem', height: '1.25rem', color: '#16a34a' }} />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#16a34a' }}>{stats.lowRisk}</div>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
        marginBottom: '1.5rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '1.125rem',
            height: '1.125rem',
            color: '#94a3b8'
          }} />
          <input
            type="text"
            placeholder="Buscar por ID de usuario..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: '2.5rem',
              height: '2.5rem',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              width: '100%',
              fontSize: '0.875rem',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setSelectedRiskFilter('ALL')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selectedRiskFilter === 'ALL' ? '#0ea5e9' : 'white',
              color: selectedRiskFilter === 'ALL' ? 'white' : '#64748b',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedRiskFilter('ALTO_RIESGO')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selectedRiskFilter === 'ALTO_RIESGO' ? '#dc2626' : 'white',
              color: selectedRiskFilter === 'ALTO_RIESGO' ? 'white' : '#64748b',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Alto Riesgo
          </button>
          <button
            onClick={() => setSelectedRiskFilter('RIESGO_MODERADO')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selectedRiskFilter === 'RIESGO_MODERADO' ? '#f59e0b' : 'white',
              color: selectedRiskFilter === 'RIESGO_MODERADO' ? 'white' : '#64748b',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Moderado
          </button>
          <button
            onClick={() => setSelectedRiskFilter('BAJO_RIESGO')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selectedRiskFilter === 'BAJO_RIESGO' ? '#16a34a' : 'white',
              color: selectedRiskFilter === 'BAJO_RIESGO' ? 'white' : '#64748b',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Bajo Riesgo
          </button>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>
                Usuario ID
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>
                Nivel de Riesgo
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>
                Índice de Severidad
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>
                Votos Totales
              </th>
              <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                  No se encontraron usuarios
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, idx) => {
                const badge = getRiskBadge(user.risk_category);
                const severityColor = getRiskColor(user.severity_index);

                return (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', fontFamily: 'monospace' }}>
                      {user.user_id_raiz?.substring(0, 8)}...
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: badge.bg,
                        color: badge.textColor,
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {badge.text}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          flex: 1,
                          height: '0.5rem',
                          backgroundColor: '#e2e8f0',
                          borderRadius: '9999px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${(user.severity_index * 100)}%`,
                            backgroundColor: severityColor
                          }}></div>
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: severityColor }}>
                          {(user.severity_index * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                      {user.total_votes || 0}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => fetchUserDetails(user.user_id_raiz)}
                        disabled={loadingDetails}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#0ea5e9',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: loadingDetails ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        <Eye style={{ width: '0.875rem', height: '0.875rem' }} />
                        Ver Perfil
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de detalles */}
      {showModal && selectedUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
          onClick={() => setShowModal(false)}
        >
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Perfil de Usuario</h2>
              <p style={{ fontSize: '0.875rem', color: '#64748b', fontFamily: 'monospace' }}>
                {selectedUser.user_id}
              </p>
            </div>

            <div style={{ padding: '1.5rem' }}>
              {/* Nivel de riesgo */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#64748b' }}>
                  Nivel de Riesgo
                </label>
                <span style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: getRiskBadge(selectedUser.risk_level).bg,
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  {getRiskBadge(selectedUser.risk_level).text}
                </span>
              </div>

              {/* Índice de severidad */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#64748b' }}>
                  Índice de Severidad
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    flex: 1,
                    height: '1rem',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '9999px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(selectedUser.severity_index * 100)}%`,
                      backgroundColor: getRiskColor(selectedUser.severity_index)
                    }}></div>
                  </div>
                  <span style={{ fontSize: '1.25rem', fontWeight: '700', color: getRiskColor(selectedUser.severity_index) }}>
                    {(selectedUser.severity_index * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* KPIs */}
              {selectedUser.kpis && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '1rem', color: '#64748b' }}>
                    Indicadores (KPIs)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {Object.entries(selectedUser.kpis).map(([key, value]) => (
                      <div key={key} style={{
                        padding: '0.75rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '0.5rem',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'capitalize' }}>
                          {key.replace(/_/g, ' ')}
                        </div>
                        <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                          {typeof value === 'number' ? value.toFixed(2) : value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contexto de recomendación */}
              {selectedUser.recommendation_context && (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(14, 165, 233, 0.05)',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(14, 165, 233, 0.2)'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#0ea5e9', marginBottom: '0.5rem' }}>
                    Contexto para IA
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.5' }}>
                    {selectedUser.recommendation_context}
                  </div>
                </div>
              )}
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '0.5rem 1.5rem',
                  backgroundColor: '#0ea5e9',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

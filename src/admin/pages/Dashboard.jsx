import { useState, useEffect } from 'react';
import { Users, MessageSquare, AlertTriangle, Activity, Clock, Heart, CheckCircle, Shield, Zap, RefreshCw } from 'lucide-react';
import { clusteringAPI } from '../api/clustering';

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeUsers: 0,
    activeUsersChange: 0,
    emergencies: 0,
    conversations: 0,
    conversationsAvg: 0,
    interventions: 0,
    interventionsAvgTime: 0
  });

  const [emotionalState, setEmotionalState] = useState({
    stable: 0,
    attention: 0,
    highRisk: 0,
    total: 0
  });

  const [responseMetrics, setResponseMetrics] = useState({
    avgResponseTime: 0,
    avgResponseTimeGoal: 10,
    successRate: 0,
    successRateGoal: 90,
    monitoring: 0,
    monitoringPercentage: 0
  });

  const [clusteringMetrics, setClusteringMetrics] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceHealth, setServiceHealth] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    checkServiceHealth();
  }, []);

  const checkServiceHealth = async () => {
    try {
      const health = await clusteringAPI.checkHealth();
      setServiceHealth(health);
    } catch (error) {
      console.error('Error verificando salud del servicio:', error);
      setServiceHealth({ healthy: false, error: error.message });
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Obtener resultados del clustering (endpoint /results del README)
      const results = await clusteringAPI.getClusteringResults();

      // Estructurar métricas según respuesta del README
      const metrics = {
        execution_date: results.execution_date,
        silhouette_score: results.metrics?.silhouette_score,
        calinski_harabasz: results.metrics?.calinski_harabasz,
        n_clusters: results.n_clusters || 4,
        total_users: results.metrics?.total_users || results.total_users,
        high_risk_percentage: results.metrics?.high_risk_percentage,
      };

      setClusteringMetrics(metrics);

      // Obtener distribución de riesgo
      const riskDist = results.risk_distribution || {};
      const highRiskCount = riskDist.ALTO_RIESGO || 0;
      const moderateRiskCount = riskDist.RIESGO_MODERADO || 0;
      const lowRiskCount = riskDist.BAJO_RIESGO || 0;
      const totalUsers = highRiskCount + moderateRiskCount + lowRiskCount;

      // Actualizar estado emocional con datos reales
      setEmotionalState({
        stable: lowRiskCount,
        attention: moderateRiskCount,
        highRisk: highRiskCount,
        total: totalUsers
      });

      // Actualizar estadísticas
      setStats(prev => ({
        ...prev,
        activeUsers: totalUsers,
        emergencies: highRiskCount,
      }));

      // Actualizar métricas de respuesta
      setResponseMetrics(prev => ({
        ...prev,
        monitoring: highRiskCount + moderateRiskCount,
        monitoringPercentage: totalUsers > 0 ?
          Math.round(((highRiskCount + moderateRiskCount) / totalUsers) * 100) : 0
      }));

    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
      // Si falla /results, intentar con los endpoints individuales como fallback
      try {
        const [highRisk, moderateRisk, lowRisk] = await Promise.all([
          clusteringAPI.getUsersByRisk('ALTO_RIESGO'),
          clusteringAPI.getUsersByRisk('RIESGO_MODERADO'),
          clusteringAPI.getUsersByRisk('BAJO_RIESGO'),
        ]);

        const totalUsers = highRisk.length + moderateRisk.length + lowRisk.length;

        setEmotionalState({
          stable: lowRisk.length,
          attention: moderateRisk.length,
          highRisk: highRisk.length,
          total: totalUsers
        });

        setStats(prev => ({
          ...prev,
          activeUsers: totalUsers,
          emergencies: highRisk.length,
        }));

        setResponseMetrics(prev => ({
          ...prev,
          monitoring: highRisk.length + moderateRisk.length,
          monitoringPercentage: totalUsers > 0 ?
            Math.round(((highRisk.length + moderateRisk.length) / totalUsers) * 100) : 0
        }));
      } catch (fallbackError) {
        console.error('Error en fallback:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'alert': return AlertTriangle;
      case 'intervention': return Shield;
      case 'follow_up': return CheckCircle;
      default: return Activity;
    }
  };

  const getActivityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#f59e0b';
      case 'success': return '#16a34a';
      default: return '#0ea5e9';
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#64748b' }}>Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: 'rgba(241, 245, 249, 0.3)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Dashboard</h1>
          <p style={{ color: '#64748b' }}>Vista general del sistema AURA</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {serviceHealth && (
            <div style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: serviceHealth.healthy ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: serviceHealth.healthy ? '#10b981' : '#ef4444',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {serviceHealth.healthy ? '● Servicio activo' : '● Servicio inactivo'}
            </div>
          )}
          <button
            onClick={fetchDashboardData}
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
              fontWeight: '500',
              opacity: loading ? 0.6 : 1
            }}
          >
            <RefreshCw style={{ width: '1rem', height: '1rem' }} />
            Actualizar
          </button>
        </div>
      </div>

      {clusteringMetrics && (
        <div style={{
          marginBottom: '1.5rem',
          padding: '1.25rem',
          backgroundColor: 'rgba(14, 165, 233, 0.05)',
          borderRadius: '0.5rem',
          border: '1px solid rgba(14, 165, 233, 0.2)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0ea5e9', margin: 0 }}>
              📊 Métricas del Clustering
            </h3>
            {clusteringMetrics.execution_date && (
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Última ejecución: {new Date(clusteringMetrics.execution_date).toLocaleString('es-MX')}
              </span>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Silhouette Score</div>
              <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>{clusteringMetrics.silhouette_score?.toFixed(3) || 'N/A'}</div>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Calinski-Harabasz</div>
              <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>{clusteringMetrics.calinski_harabasz?.toFixed(1) || 'N/A'}</div>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Número de Clusters</div>
              <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>{clusteringMetrics.n_clusters || 'N/A'}</div>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Total Usuarios</div>
              <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>{clusteringMetrics.total_users || emotionalState.total}</div>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '0.375rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.25rem' }}>% Alto Riesgo</div>
              <div style={{ fontWeight: '700', fontSize: '1.125rem', color: '#ef4444' }}>
                {clusteringMetrics.high_risk_percentage?.toFixed(1) || 0}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Métricas principales */}
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '1.5rem' }}>
        <div className="card border-l-primary" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Usuarios Activos Hoy</h3>
            <Users style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>{stats.activeUsers}</div>
            {stats.activeUsersChange !== 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', color: stats.activeUsersChange > 0 ? '#16a34a' : '#dc2626' }}>
                  {stats.activeUsersChange > 0 ? '+' : ''}{stats.activeUsersChange}% vs ayer
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #dc2626' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Emergencias Sin Atender</h3>
            <AlertTriangle style={{ width: '1.25rem', height: '1.25rem', color: '#dc2626' }} />
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#dc2626' }}>{stats.emergencies}</div>
            {stats.emergencies > 0 && (
              <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.5rem' }}>REQUIERE ATENCIÓN URGENTE</p>
            )}
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Conversaciones IA Hoy</h3>
            <MessageSquare style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>{stats.conversations}</div>
            {stats.conversationsAvg > 0 && (
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>Promedio: {stats.conversationsAvg} por usuario</p>
            )}
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Intervenciones Hoy</h3>
            <Shield style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>{stats.interventions}</div>
            {stats.interventionsAvgTime > 0 && (
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>Tiempo promedio: {stats.interventionsAvgTime} min</p>
            )}
          </div>
        </div>
      </div>

      {/* Gráficas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Actividad de la Semana */}
        <div className="card">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Actividad de la Semana</h3>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <div style={{ height: '250px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <div style={{ textAlign: 'center' }}>
                <Activity style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem' }} />
                <p>Gráfica de área - Conversaciones IA vs Intervenciones</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.8 }}>Datos de API pendiente</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estado Emocional Actual */}
        <div className="card">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Estado Emocional Actual</h3>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: 'conic-gradient(#10b981 0deg 315deg, #f59e0b 315deg 342deg, #ef4444 342deg 360deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'white' }}></div>
              </div>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                  <span style={{ fontSize: '0.875rem' }}>Estables</span>
                </div>
                <span style={{ fontWeight: '500' }}>{emotionalState.stable} usuarios</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                  <span style={{ fontSize: '0.875rem' }}>Atención</span>
                </div>
                <span style={{ fontWeight: '500' }}>{emotionalState.attention} usuarios</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                  <span style={{ fontSize: '0.875rem' }}>Riesgo Alto</span>
                </div>
                <span style={{ fontWeight: '500' }}>{emotionalState.highRisk} usuarios</span>
              </div>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#64748b' }}>Total usuarios:</span>
                <span style={{ fontWeight: '500' }}>{emotionalState.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas de Respuesta */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Métricas de Respuesta</h3>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <span>Tiempo promedio de respuesta</span>
                <span style={{ color: responseMetrics.avgResponseTime <= responseMetrics.avgResponseTimeGoal ? '#16a34a' : '#ea580c', fontWeight: '500' }}>
                  {responseMetrics.avgResponseTime} min
                </span>
              </div>
              <div style={{ height: '0.5rem', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${Math.min((responseMetrics.avgResponseTime / responseMetrics.avgResponseTimeGoal) * 100, 100)}%`, 
                  backgroundColor: '#0ea5e9' 
                }}></div>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                Meta: menos de {responseMetrics.avgResponseTimeGoal} min
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <span>Tasa de intervención exitosa</span>
                <span style={{ color: '#16a34a', fontWeight: '500' }}>{responseMetrics.successRate}%</span>
              </div>
              <div style={{ height: '0.5rem', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${responseMetrics.successRate}%`, backgroundColor: '#0ea5e9' }}></div>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                Meta: mayor a {responseMetrics.successRateGoal}%
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <span>Usuarios en seguimiento</span>
                <span style={{ color: '#ea580c', fontWeight: '500' }}>{responseMetrics.monitoring}</span>
              </div>
              <div style={{ height: '0.5rem', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${responseMetrics.monitoringPercentage}%`, backgroundColor: '#ea580c' }}></div>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                {responseMetrics.monitoringPercentage}% del total
              </p>
            </div>

            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'rgba(14, 165, 233, 0.1)', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Heart style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
                  <span style={{ fontSize: '0.875rem' }}>Estado del sistema</span>
                </div>
                <span className="badge badge-primary">Óptimo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actividad Reciente y Accesos Rápidos */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Actividad Reciente */}
        <div className="card">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity style={{ width: '1.25rem', height: '1.25rem' }} />
              Actividad Reciente
            </h3>
          </div>
          <div style={{ padding: '1.5rem' }}>
            {recentActivity.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: '#64748b' }}>
                <Activity style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem', color: '#94a3b8' }} />
                <p>No hay actividad reciente</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {recentActivity.map((activity, idx) => {
                  const Icon = getActivityIcon(activity.type);
                  const color = getActivityColor(activity.severity);
                  
                  return (
                    <div key={idx} style={{ 
                      padding: '1rem', 
                      borderRadius: '0.5rem', 
                      borderLeft: `4px solid ${color}`,
                      backgroundColor: `${color}0D`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <Icon style={{ width: '1.25rem', height: '1.25rem', color, marginTop: '0.125rem' }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{activity.description}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: '#64748b' }}>
                            <span>{activity.userId}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Clock style={{ width: '0.75rem', height: '0.75rem' }} />
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Accesos Rápidos */}
        <div className="card">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap style={{ width: '1.25rem', height: '1.25rem' }} />
              Accesos Rápidos
            </h3>
          </div>
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button className="btn btn-outline" style={{ height: 'auto', padding: '0.75rem', justifyContent: 'flex-start', borderColor: 'rgba(220, 38, 38, 0.3)', backgroundColor: 'rgba(220, 38, 38, 0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                <AlertTriangle style={{ width: '1.25rem', height: '1.25rem', color: '#dc2626' }} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>Ver Emergencias</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{stats.emergencies} sin atender</p>
                </div>
              </div>
            </button>

            <button className="btn btn-outline" style={{ height: 'auto', padding: '0.75rem', justifyContent: 'flex-start', borderColor: 'rgba(234, 88, 12, 0.3)', backgroundColor: 'rgba(234, 88, 12, 0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                <Users style={{ width: '1.25rem', height: '1.25rem', color: '#ea580c' }} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>Usuarios en Riesgo</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{responseMetrics.monitoring} requieren seguimiento</p>
                </div>
              </div>
            </button>

            <button className="btn btn-outline" style={{ height: 'auto', padding: '0.75rem', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                <MessageSquare style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>Conversaciones IA</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{stats.conversations} hoy</p>
                </div>
              </div>
            </button>

            <button className="btn btn-outline" style={{ height: 'auto', padding: '0.75rem', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                <Shield style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>Intervenciones</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{stats.interventions} realizadas hoy</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
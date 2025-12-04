import { useState, useEffect } from 'react';
import { TrendingUp, MessageSquare, Activity } from 'lucide-react';

export default function Analiticas() {
  const [metrics, setMetrics] = useState({
    growth: 0,
    engagement: 0,
    retention: 0,
    conversations: 0
  });

  const [keyMetrics, setKeyMetrics] = useState({
    avgResponseTime: 0,
    avgResponseTimeGoal: 10,
    avgConversationsPerUser: 0,
    crisisDetectionRate: 0,
    usersImproved: 0
  });

  const [emotionalState, setEmotionalState] = useState({
    stable: 0,
    stablePercentage: 0,
    monitoring: 0,
    monitoringPercentage: 0,
    highRisk: 0,
    highRiskPercentage: 0
  });

  const [interventionStats, setInterventionStats] = useState({
    successRate: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // TODO: Reemplazar con endpoints reales
      // const metricsRes = await fetch('/api/analytics/metrics');
      // const metricsData = await metricsRes.json();
      // setMetrics(metricsData);

      // const keyMetricsRes = await fetch('/api/analytics/key-metrics');
      // const keyMetricsData = await keyMetricsRes.json();
      // setKeyMetrics(keyMetricsData);

      // const emotionalRes = await fetch('/api/analytics/emotional-state');
      // const emotionalData = await emotionalRes.json();
      // setEmotionalState(emotionalData);

      // const interventionRes = await fetch('/api/analytics/interventions');
      // const interventionData = await interventionRes.json();
      // setInterventionStats(interventionData);
    } catch (error) {
      console.error('Error al cargar analíticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#64748b' }}>Cargando analíticas...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: 'rgba(241, 245, 249, 0.3)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Analíticas Avanzadas</h1>
        <p style={{ color: '#64748b' }}>Estadísticas y reportes del sistema</p>
      </div>

      {/* Métricas generales */}
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '1.5rem' }}>
        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Crecimiento</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>{metrics.growth > 0 ? '+' : ''}{metrics.growth}%</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Usuarios este mes</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Engagement</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>{metrics.engagement}%</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Usuarios activos</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Retención</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>{metrics.retention}%</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Usuarios estables</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Conversaciones</h3>
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>{metrics.conversations.toLocaleString()}</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Con IA este mes</p>
          </div>
        </div>
      </div>

      {/* Gráficas simuladas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="card">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Crecimiento de Usuarios</h3>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <div style={{ height: '300px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <div style={{ textAlign: 'center' }}>
                <TrendingUp style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem' }} />
                <p>Gráfica de líneas - Evolución mensual</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.8 }}>Datos de API pendiente</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Conversaciones y Alertas IA</h3>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <div style={{ height: '300px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <div style={{ textAlign: 'center' }}>
                <MessageSquare style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem' }} />
                <p>Gráfica de barras - Interacciones mensuales</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.8 }}>Datos de API pendiente</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas clave */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Métricas Clave del Sistema</h3>
        </div>
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'rgba(241, 245, 249, 0.5)', borderRadius: '0.5rem' }}>
            <div>
              <p style={{ fontWeight: '500' }}>Tiempo promedio de respuesta a alertas</p>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Meta: menos de {keyMetrics.avgResponseTimeGoal} minutos</p>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0ea5e9' }}>{keyMetrics.avgResponseTime} min</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'rgba(241, 245, 249, 0.5)', borderRadius: '0.5rem' }}>
            <div>
              <p style={{ fontWeight: '500' }}>Conversaciones promedio por usuario</p>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Interacción con IA mensual</p>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0ea5e9' }}>{keyMetrics.avgConversationsPerUser}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'rgba(241, 245, 249, 0.5)', borderRadius: '0.5rem' }}>
            <div>
              <p style={{ fontWeight: '500' }}>Tasa de detección de crisis</p>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Alertas generadas vs conversaciones</p>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0ea5e9' }}>{keyMetrics.crisisDetectionRate}%</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'rgba(241, 245, 249, 0.5)', borderRadius: '0.5rem' }}>
            <div>
              <p style={{ fontWeight: '500' }}>Usuarios que mejoraron su estado</p>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Últimos 30 días</p>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0ea5e9' }}>{keyMetrics.usersImproved}%</div>
          </div>
        </div>
      </div>

      {/* Estado emocional */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="card" style={{ backgroundColor: 'rgba(22, 163, 74, 0.05)', borderColor: 'rgba(22, 163, 74, 0.2)' }}>
          <div style={{ padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Estables</p>
            <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#16a34a' }}>{emotionalState.stablePercentage}%</p>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>{emotionalState.stable} usuarios</p>
          </div>
        </div>

        <div className="card" style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
          <div style={{ padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>En Monitoreo</p>
            <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#f59e0b' }}>{emotionalState.monitoringPercentage}%</p>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>{emotionalState.monitoring} usuarios</p>
          </div>
        </div>

        <div className="card" style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)', borderColor: 'rgba(220, 38, 38, 0.2)' }}>
          <div style={{ padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Alto Riesgo</p>
            <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#dc2626' }}>{emotionalState.highRiskPercentage}%</p>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>{emotionalState.highRisk} usuarios</p>
          </div>
        </div>
      </div>

      {/* Gráfica de intervenciones */}
      <div className="card">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Efectividad de Intervenciones</h3>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ height: '300px', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <div style={{ textAlign: 'center' }}>
              <Activity style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem' }} />
              <p style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Gráfica de barras comparativa</p>
              <p style={{ fontSize: '0.875rem' }}>Total intervenciones vs Exitosas</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.8 }}>Datos de API pendiente</p>
            </div>
          </div>
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(241, 245, 249, 0.5)', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem' }}>
              <strong>Tasa de éxito promedio: </strong>
              <span style={{ color: '#0ea5e9', fontWeight: '600' }}>{interventionStats.successRate}%</span>
            </p>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
              Las intervenciones han sido exitosas en la mayoría de los casos, demostrando la efectividad del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
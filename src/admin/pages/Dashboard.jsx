import { Users, MessageSquare, AlertTriangle, Activity, Clock, TrendingUp, Shield, Heart, CheckCircle, UserCheck, Zap, ArrowUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'rgba(241, 245, 249, 0.3)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Dashboard</h1>
        <p style={{ color: '#64748b' }}>Vista general del sistema AURA</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '1.5rem' }}>
        <div className="card border-l-primary" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Usuarios Activos Hoy</h3>
            <Users style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>1,247</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
              <ArrowUp style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
              <p style={{ fontSize: '0.75rem', color: '#16a34a' }}>+8.5% vs ayer</p>
            </div>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #dc2626' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Emergencias Sin Atender</h3>
            <AlertTriangle style={{ width: '1.25rem', height: '1.25rem', color: '#dc2626' }} />
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#dc2626' }}>3</div>
            <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.5rem' }}>REQUIERE ATENCIÓN URGENTE</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Conversaciones IA Hoy</h3>
            <MessageSquare style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>2,843</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>Promedio: 2.3 por usuario</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div style={{ padding: '1.5rem', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Intervenciones Hoy</h3>
            <Shield style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
          </div>
          <div style={{ padding: '1.5rem', paddingTop: '0' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '700' }}>45</div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>Tiempo promedio: 8 min</p>
          </div>
        </div>
      </div>

      {/* Gráficas (2 columnas) */}
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
              {/* Simulación de gráfica circular */}
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
                <span style={{ fontWeight: '500' }}>1089 usuarios</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                  <span style={{ fontSize: '0.875rem' }}>Atención</span>
                </div>
                <span style={{ fontWeight: '500' }}>135 usuarios</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                  <span style={{ fontSize: '0.875rem' }}>Riesgo Alto</span>
                </div>
                <span style={{ fontWeight: '500' }}>23 usuarios</span>
              </div>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#64748b' }}>Total usuarios:</span>
                <span style={{ fontWeight: '500' }}>1,247</span>
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
                <span style={{ color: '#16a34a', fontWeight: '500' }}>8 min</span>
              </div>
              <div style={{ height: '0.5rem', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '85%', backgroundColor: '#0ea5e9' }}></div>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Meta: menos de 10 min</p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <span>Tasa de intervención exitosa</span>
                <span style={{ color: '#16a34a', fontWeight: '500' }}>94.3%</span>
              </div>
              <div style={{ height: '0.5rem', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '94.3%', backgroundColor: '#0ea5e9' }}></div>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Meta: mayor a 90%</p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <span>Usuarios en seguimiento</span>
                <span style={{ color: '#ea580c', fontWeight: '500' }}>23</span>
              </div>
              <div style={{ height: '0.5rem', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '18%', backgroundColor: '#ea580c' }}></div>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>1.8% del total</p>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { icon: AlertTriangle, color: '#ea580c', text: 'Se detectó una alerta de alto riesgo', user: '#1843', time: 'Hace 5 min', severity: 'red' },
                { icon: Shield, color: '#0ea5e9', text: 'Intervención de emergencia iniciada', user: '#1843', time: 'Hace 6 min', severity: 'orange' },
                { icon: AlertTriangle, color: '#f59e0b', text: 'Alerta de riesgo medio detectada', user: '#2457', time: 'Hace 10 min', severity: 'yellow' },
                { icon: CheckCircle, color: '#16a34a', text: 'Conversación de seguimiento completada', user: '#1621', time: 'Hace 15 min', severity: 'green' },
                { icon: Shield, color: '#0ea5e9', text: 'Usuario derivado a psicólogo profesional', user: '#2109', time: 'Hace 23 min', severity: 'orange' },
                { icon: CheckCircle, color: '#16a34a', text: 'Usuario marcado como estable', user: '#1547', time: 'Hace 34 min', severity: 'green' }
              ].map((activity, idx) => (
                <div key={idx} style={{ 
                  padding: '1rem', 
                  borderRadius: '0.5rem', 
                  borderLeft: `4px solid ${activity.severity === 'red' ? '#dc2626' : activity.severity === 'orange' ? '#ea580c' : activity.severity === 'yellow' ? '#f59e0b' : '#16a34a'}`,
                  backgroundColor: activity.severity === 'red' ? 'rgba(220, 38, 38, 0.05)' : activity.severity === 'orange' ? 'rgba(234, 88, 12, 0.05)' : activity.severity === 'yellow' ? 'rgba(245, 158, 11, 0.05)' : 'rgba(22, 163, 74, 0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <activity.icon style={{ width: '1.25rem', height: '1.25rem', color: activity.color, marginTop: '0.125rem' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{activity.text}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: '#64748b' }}>
                        <span>{activity.user}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock style={{ width: '0.75rem', height: '0.75rem' }} />
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>3 sin atender</p>
                </div>
              </div>
            </button>

            <button className="btn btn-outline" style={{ height: 'auto', padding: '0.75rem', justifyContent: 'flex-start', borderColor: 'rgba(234, 88, 12, 0.3)', backgroundColor: 'rgba(234, 88, 12, 0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                <UserCheck style={{ width: '1.25rem', height: '1.25rem', color: '#ea580c' }} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>Usuarios en Riesgo</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>23 requieren seguimiento</p>
                </div>
              </div>
            </button>

            <button className="btn btn-outline" style={{ height: 'auto', padding: '0.75rem', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                <MessageSquare style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>Conversaciones IA</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>2,843 hoy</p>
                </div>
              </div>
            </button>

            <button className="btn btn-outline" style={{ height: 'auto', padding: '0.75rem', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                <Shield style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>Intervenciones</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>45 realizadas hoy</p>
                </div>
              </div>
            </button>

            <button className="btn btn-outline" style={{ height: 'auto', padding: '0.75rem', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: '#0ea5e9' }} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>Ver Analíticas</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Estadísticas completas</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
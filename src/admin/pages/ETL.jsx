import { useState } from 'react';
import { Play, Database, Loader2, CheckCircle, AlertCircle, Activity, TrendingUp } from 'lucide-react';
import { clusteringAPI } from '../api/clustering';

export default function ETL() {
  const [etlLoading, setEtlLoading] = useState(false);
  const [clusteringLoading, setClusteringLoading] = useState(false);
  const [etlResult, setEtlResult] = useState(null);
  const [clusteringResult, setClusteringResult] = useState(null);
  const [etlError, setEtlError] = useState(null);
  const [clusteringError, setClusteringError] = useState(null);
  const [skipNLP, setSkipNLP] = useState(false);
  const [nClusters, setNClusters] = useState(4);

  const executeETL = async () => {
    setEtlLoading(true);
    setEtlError(null);
    setEtlResult(null);

    try {
      const result = await clusteringAPI.executeETL(skipNLP);
      setEtlResult(result);
      console.log('ETL Result:', result);
    } catch (error) {
      setEtlError(error.message);
      console.error('ETL Error:', error);
    } finally {
      setEtlLoading(false);
    }
  };

  const executeClustering = async (contamination = 0.1) => {
    setClusteringLoading(true);
    setClusteringError(null);
    setClusteringResult(null);

    try {
      const result = await clusteringAPI.executeClustering(nClusters, contamination);
      setClusteringResult(result);
      console.log('Clustering Result:', result);
    } catch (error) {
      setClusteringError(error.message);
      console.error('Clustering Error:', error);
    } finally {
      setClusteringLoading(false);
    }
  };

  const executeAll = async () => {
    await executeETL();
    // Esperar un poco antes de ejecutar clustering
    setTimeout(async () => {
      await executeClustering();
    }, 2000);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'rgba(241, 245, 249, 0.3)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          ETL & Clustering
        </h1>
        <p style={{ color: '#64748b' }}>
          Ejecuta procesos de extracción de datos y análisis de clustering
        </p>
      </div>

      {/* Información del flujo */}
      <div style={{
        backgroundColor: 'rgba(14, 165, 233, 0.05)',
        border: '1px solid rgba(14, 165, 233, 0.2)',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#0ea5e9' }}>
          📋 Flujo Recomendado
        </h3>
        <ol style={{ margin: 0, paddingLeft: '1.5rem', color: '#64748b', fontSize: '0.875rem', lineHeight: '1.8' }}>
          <li><strong>Ejecutar ETL:</strong> Extrae y procesa datos de todas las bases de datos (auth, social, messaging)</li>
          <li><strong>Ejecutar Clustering:</strong> Clasifica usuarios en niveles de riesgo usando Machine Learning</li>
          <li><strong>Frecuencia:</strong> ETL cada 6-12 horas, Clustering después de cada ETL</li>
        </ol>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Panel ETL */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Database style={{ width: '1.5rem', height: '1.5rem', color: '#0ea5e9' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Proceso ETL</h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.5rem 0 0 0' }}>
              Extrae vectores de características de usuarios
            </p>
          </div>

          <div style={{ padding: '1.5rem' }}>
            {/* Opciones */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: '#64748b'
              }}>
                <input
                  type="checkbox"
                  checked={skipNLP}
                  onChange={(e) => setSkipNLP(e.target.checked)}
                  disabled={etlLoading}
                  style={{ cursor: 'pointer' }}
                />
                Omitir análisis NLP (más rápido)
              </label>
            </div>

            {/* Botón ejecutar */}
            <button
              onClick={executeETL}
              disabled={etlLoading}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: etlLoading ? '#94a3b8' : '#0ea5e9',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: etlLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}
            >
              {etlLoading ? (
                <>
                  <Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />
                  Ejecutando ETL...
                </>
              ) : (
                <>
                  <Play style={{ width: '1rem', height: '1rem' }} />
                  Ejecutar ETL
                </>
              )}
            </button>

            {/* Resultado */}
            {etlResult && (
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#10b981', marginBottom: '0.25rem' }}>
                    {etlResult.data?.message || 'ETL completado exitosamente'}
                  </div>
                  {etlResult.data?.records_processed && (
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                      Registros procesados: {etlResult.data.records_processed}
                    </div>
                  )}
                  {etlResult.data?.next_step && (
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                      {etlResult.data.next_step}
                    </div>
                  )}
                </div>
              </div>
            )}

            {etlError && (
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <AlertCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#ef4444', marginBottom: '0.25rem' }}>
                    Error en ETL
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {etlError}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Panel Clustering */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Activity style={{ width: '1.5rem', height: '1.5rem', color: '#8b5cf6' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Clustering ML</h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.5rem 0 0 0' }}>
              Clasifica usuarios por nivel de riesgo
            </p>
          </div>

          <div style={{ padding: '1.5rem' }}>
            {/* Opciones */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#64748b'
              }}>
                Número de clusters
              </label>
              <input
                type="number"
                min="2"
                max="10"
                value={nClusters}
                onChange={(e) => setNClusters(parseInt(e.target.value))}
                disabled={clusteringLoading}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            {/* Botón ejecutar */}
            <button
              onClick={executeClustering}
              disabled={clusteringLoading}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: clusteringLoading ? '#94a3b8' : '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: clusteringLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}
            >
              {clusteringLoading ? (
                <>
                  <Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />
                  Ejecutando Clustering...
                </>
              ) : (
                <>
                  <TrendingUp style={{ width: '1rem', height: '1rem' }} />
                  Ejecutar Clustering
                </>
              )}
            </button>

            {/* Resultado */}
            {clusteringResult && (
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(139, 92, 246, 0.05)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#8b5cf6', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#8b5cf6', marginBottom: '0.25rem' }}>
                      Clustering completado exitosamente
                    </div>
                    {clusteringResult.data?.total_users && (
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Total usuarios: {clusteringResult.data.total_users}
                      </div>
                    )}
                  </div>
                </div>
                {clusteringResult.data?.risk_distribution && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    marginTop: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(139, 92, 246, 0.2)'
                  }}>
                    <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.375rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Alto Riesgo</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ef4444' }}>
                        {clusteringResult.data.risk_distribution.ALTO_RIESGO || 0}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '0.375rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Moderado</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b' }}>
                        {clusteringResult.data.risk_distribution.RIESGO_MODERADO || 0}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.375rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Bajo Riesgo</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981' }}>
                        {clusteringResult.data.risk_distribution.BAJO_RIESGO || 0}
                      </div>
                    </div>
                  </div>
                )}
                {clusteringResult.data?.metrics && (
                  <div style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem',
                    backgroundColor: 'rgba(139, 92, 246, 0.05)',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    color: '#64748b'
                  }}>
                    <div>Silhouette Score: <strong>{clusteringResult.data.metrics.silhouette_score?.toFixed(3)}</strong></div>
                    <div>% Alto Riesgo: <strong style={{ color: '#ef4444' }}>{clusteringResult.data.metrics.high_risk_percentage?.toFixed(1)}%</strong></div>
                  </div>
                )}
              </div>
            )}

            {clusteringError && (
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <AlertCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#ef4444', marginBottom: '0.25rem' }}>
                    Error en Clustering
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {clusteringError}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ejecutar todo */}
      <div style={{
        marginTop: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
          Ejecución Completa
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
          Ejecuta primero ETL y luego Clustering automáticamente (recomendado)
        </p>
        <button
          onClick={executeAll}
          disabled={etlLoading || clusteringLoading}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: (etlLoading || clusteringLoading) ? '#94a3b8' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: (etlLoading || clusteringLoading) ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}
        >
          {(etlLoading || clusteringLoading) ? (
            <>
              <Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />
              Ejecutando proceso completo...
            </>
          ) : (
            <>
              <Play style={{ width: '1rem', height: '1rem' }} />
              Ejecutar ETL + Clustering
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

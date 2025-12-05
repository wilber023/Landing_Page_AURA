import { useState, useEffect } from 'react';
import { BarChart3, ScatterChart, Activity, TrendingUp, Loader2 } from 'lucide-react';
import { clusteringAPI } from '../api/clustering';

export default function Visualizaciones() {
  const [selectedViz, setSelectedViz] = useState('scatter');
  const [vizHTML, setVizHTML] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const visualizations = [
    { id: 'scatter', name: 'Scatter Plot PCA', icon: ScatterChart, description: 'Visualización de clustering en 2D' },
    { id: 'distribution', name: 'Distribución de Riesgo', icon: BarChart3, description: 'Gráfico de barras por nivel' },
    { id: 'radar', name: 'Perfil de Clusters', icon: Activity, description: 'Radar chart de KPIs' },
    { id: 'severity', name: 'Histograma Severidad', icon: TrendingUp, description: 'Distribución del índice' },
    { id: 'kmeans', name: 'Clusters K-Means', icon: ScatterChart, description: 'Visualización de clusters' },
  ];

  useEffect(() => {
    loadVisualization(selectedViz);
  }, [selectedViz]);

  const loadVisualization = async (type) => {
    setLoading(true);
    setError('');
    try {
      const html = await clusteringAPI.getVisualization(type);
      setVizHTML(html);
    } catch (err) {
      setError('Error al cargar la visualización: ' + err.message);
      console.error('Error cargando visualización:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'rgba(241, 245, 249, 0.3)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Visualizaciones ML</h1>
        <p style={{ color: '#64748b' }}>Análisis visual del clustering y riesgo emocional</p>
      </div>

      {/* Selector de visualizaciones */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {visualizations.map((viz) => {
          const Icon = viz.icon;
          const isSelected = selectedViz === viz.id;

          return (
            <button
              key={viz.id}
              onClick={() => setSelectedViz(viz.id)}
              style={{
                padding: '1rem',
                backgroundColor: isSelected ? '#0ea5e9' : 'white',
                color: isSelected ? 'white' : '#1e293b',
                border: isSelected ? 'none' : '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                boxShadow: isSelected ? '0 4px 6px rgba(14, 165, 233, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#0ea5e9';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Icon style={{ width: '1.25rem', height: '1.25rem' }} />
                <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{viz.name}</span>
              </div>
              <p style={{
                fontSize: '0.75rem',
                opacity: isSelected ? 0.9 : 0.7,
                margin: 0
              }}>
                {viz.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Área de visualización */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        minHeight: '600px',
        position: 'relative'
      }}>
        {loading && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '600px',
            gap: '1rem'
          }}>
            <Loader2 style={{
              width: '3rem',
              height: '3rem',
              color: '#0ea5e9',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ color: '#64748b' }}>Cargando visualización...</p>
          </div>
        )}

        {error && !loading && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '600px',
            padding: '2rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#dc2626',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              textAlign: 'center'
            }}>
              {error}
            </div>
          </div>
        )}

        {!loading && !error && vizHTML && (
          <div style={{ width: '100%', height: '100%' }}>
            <iframe
              srcDoc={vizHTML}
              style={{
                width: '100%',
                minHeight: '600px',
                border: 'none',
                borderRadius: '0.5rem'
              }}
              title={`Visualización: ${visualizations.find(v => v.id === selectedViz)?.name}`}
            />
          </div>
        )}
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

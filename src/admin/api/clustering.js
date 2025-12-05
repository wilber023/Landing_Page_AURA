import { API_ENDPOINTS } from '../config/api';

export const clusteringAPI = {
  // Ejecutar clustering
  executeClustering: async (nClusters = 4, contamination = 0.1) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.CLUSTERING.EXECUTE}?n_clusters=${nClusters}&contamination=${contamination}`,
        {
          method: 'POST',
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al ejecutar clustering');
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error ejecutando clustering:', error);
      throw error;
    }
  },

  // Ejecutar ETL
  executeETL: async (skipNLP = false) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.ETL.EXECUTE}?skip_nlp=${skipNLP}`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al ejecutar ETL');
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error ejecutando ETL:', error);
      throw error;
    }
  },

  // Obtener resultados del último clustering (endpoint /results)
  getClusteringResults: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CLUSTERING.RESULTS);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener resultados');
      }

      return data;
    } catch (error) {
      console.error('Error obteniendo resultados:', error);
      throw error;
    }
  },

  // Obtener perfiles promedio de clusters
  getClusterProfiles: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CLUSTERING.PROFILES);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener perfiles');
      }

      return data;
    } catch (error) {
      console.error('Error obteniendo perfiles:', error);
      throw error;
    }
  },

  // Obtener usuarios por nivel de riesgo
  getUsersByRisk: async (riskLevel) => {
    try {
      const response = await fetch(API_ENDPOINTS.CLUSTERING.USERS_BY_RISK(riskLevel));
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener usuarios');
      }

      return data;
    } catch (error) {
      console.error('Error obteniendo usuarios por riesgo:', error);
      throw error;
    }
  },

  // Obtener perfil de usuario
  getUserProfile: async (userId) => {
    try {
      const response = await fetch(API_ENDPOINTS.CLUSTERING.USER_PROFILE(userId));
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener perfil de usuario');
      }

      return data;
    } catch (error) {
      console.error('Error obteniendo perfil de usuario:', error);
      throw error;
    }
  },

  // Obtener visualización como HTML embebido
  getVisualization: async (type) => {
    try {
      let endpoint;
      switch (type) {
        case 'scatter':
          endpoint = API_ENDPOINTS.CLUSTERING.SCATTER;
          break;
        case 'distribution':
          endpoint = API_ENDPOINTS.CLUSTERING.DISTRIBUTION;
          break;
        case 'radar':
          endpoint = API_ENDPOINTS.CLUSTERING.RADAR;
          break;
        case 'severity':
          endpoint = API_ENDPOINTS.CLUSTERING.SEVERITY;
          break;
        case 'kmeans':
          endpoint = API_ENDPOINTS.CLUSTERING.KMEANS;
          break;
        case 'dashboard':
          endpoint = API_ENDPOINTS.CLUSTERING.DASHBOARD;
          break;
        default:
          throw new Error('Tipo de visualización no válido');
      }

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Error al obtener visualización');
      }

      const html = await response.text();
      return html;
    } catch (error) {
      console.error('Error obteniendo visualización:', error);
      throw error;
    }
  },

  // Verificar estado del servicio
  checkHealth: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.HEALTH);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Servicio de clustering no disponible');
      }

      return {
        healthy: true,
        data
      };
    } catch (error) {
      console.error('Error verificando salud del servicio:', error);
      return {
        healthy: false,
        error: error.message
      };
    }
  },
};

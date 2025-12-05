// Configuración de la API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://3.213.101.39:3000',
  AUTH_ENDPOINT: '/api/auth',
  CLUSTERING_BASE_URL: import.meta.env.VITE_CLUSTERING_API_URL || 'http://3.213.101.39:8001',
  TIMEOUT: 10000, // 10 segundos
};

// Construir URLs completas
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_ENDPOINT}/login`,
  PROFILE: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_ENDPOINT}/profile`,
  REGISTER: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_ENDPOINT}/register`,
  USERS: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_ENDPOINT}/users`,

  // Clustering & Data Miner endpoints
  CLUSTERING: {
    EXECUTE: `${API_CONFIG.CLUSTERING_BASE_URL}/api/v1/clustering/execute`,
    RESULTS: `${API_CONFIG.CLUSTERING_BASE_URL}/api/v1/clustering/results`,
    PROFILES: `${API_CONFIG.CLUSTERING_BASE_URL}/api/v1/clustering/profiles`,
    DASHBOARD: `${API_CONFIG.CLUSTERING_BASE_URL}/api/v1/clustering/visualize/dashboard`,
    SCATTER: `${API_CONFIG.CLUSTERING_BASE_URL}/api/v1/clustering/visualize/scatter`,
    DISTRIBUTION: `${API_CONFIG.CLUSTERING_BASE_URL}/api/v1/clustering/visualize/distribution`,
    RADAR: `${API_CONFIG.CLUSTERING_BASE_URL}/api/v1/clustering/visualize/radar`,
    SEVERITY: `${API_CONFIG.CLUSTERING_BASE_URL}/api/v1/clustering/visualize/severity`,
    KMEANS: `${API_CONFIG.CLUSTERING_BASE_URL}/api/v1/clustering/visualize/kmeans`,
    USERS_BY_RISK: (riskLevel) => `${API_CONFIG.CLUSTERING_BASE_URL}/api/v1/clustering/users/${riskLevel}`,
    USER_PROFILE: (userId) => `${API_CONFIG.CLUSTERING_BASE_URL}/api/v1/clustering/user-profile/${userId}`,
  },

  // ETL endpoints
  ETL: {
    EXECUTE: `${API_CONFIG.CLUSTERING_BASE_URL}/api/v1/data-miner/execute-etl`,
  },

  // Health check
  HEALTH: `${API_CONFIG.CLUSTERING_BASE_URL}/health`,
};

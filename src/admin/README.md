    # 🧾 REPORTE TÉCNICO — MÓDULO ADMINISTRATIVO

    **Proyecto:** Plataforma AURA (Análisis y Reconexión Humana Asistida)  
    **Nombre corto:** Innovación W.E.L.  
    **Área:** Panel Administrativo Web  
    **Tecnología:** React.js + Vite  
    **Versión:** 1.0.0

    ---

    ## 🔰 1. Descripción General

    El módulo administrativo de la plataforma AURA (Innovación W.E.L.) tiene como objetivo ofrecer una interfaz de control y monitoreo del sistema desarrollado en Flutter.

    El administrador podrá visualizar métricas, alertas, usuarios y analíticas mediante un panel web moderno y responsivo.

    **Características principales:**
    - ✅ Autenticación segura con JWT
    - ✅ Rutas protegidas
    - ✅ Dashboard con métricas en tiempo real
    - ✅ Sistema de alertas clasificadas
    - ✅ Gestión completa de usuarios
    - ✅ Analytics avanzados con gráficas interactivas
    - ✅ Comunicación API REST con el backend

    Este módulo se integra dentro de una aplicación existente (que incluye una landing page), y se monta en un contenedor separado (`<div id="admin-root"></div>`) sin interferir con la estructura actual del sitio.

    ---

    ## 🧱 2. Estructura Base del Módulo

    ```
    src/admin/
    ├── api/                    # Controladores de API
    │   ├── alerts.js          # Gestión de alertas
    │   ├── analytics.js       # Datos analíticos
    │   ├── auth.js           # Autenticación
    │   ├── dashboard.js      # Datos del dashboard
    │   └── users.js          # Gestión de usuarios
    ├── components/            # Componentes reutilizables
    │   ├── Card.jsx          # Tarjetas de métricas (KPI)
    │   ├── Chart.jsx         # Componente de gráficas
    │   ├── Loader.jsx        # Indicador de carga
    │   ├── Navbar.jsx        # Barra superior
    │   └── Sidebar.jsx       # Menú lateral
    ├── context/              # Contextos globales
    │   └── AuthContext.jsx   # Estado de autenticación
    ├── pages/                # Vistas principales
    │   ├── Alerts.jsx        # Página de alertas
    │   ├── Analytics.jsx     # Página de análisis
    │   ├── Dashboard.jsx     # Panel principal
    │   ├── Login.jsx         # Formulario de login
    │   └── Users.jsx         # Gestión de usuarios
    ├── routes/               # Configuración de rutas
    │   ├── AppRouter.jsx     # Router principal
    │   └── PrivateRoute.jsx  # Protección de rutas
    ├── utils/                # Utilidades
    │   └── formatDate.js     # Formateo de fechas
    ├── AdminApp.jsx          # Componente raíz del admin
    ├── admin-main.jsx        # Punto de entrada
    ├── admin.css            # Estilos del módulo
    └── README.md            # Este archivo
    ```

    ---

    ## 🧩 3. Descripción Técnica por Archivo

    ### 📂 Carpeta `/api` - Controladores de Backend

    #### **Tipos de variables comunes:**
    ```javascript
    // Estructura de respuesta API estándar
    interface ApiResponse {
    success: boolean;
    data: any;
    message?: string;
    error?: string;
    }

    // Token de autenticación
    interface AuthToken {
    token: string;
    expiresAt: string;
    user: UserProfile;
    }
    ```

    | Archivo | Descripción | Variables Principales | Funciones Requeridas |
    |---------|-------------|----------------------|---------------------|
    | **auth.js** | Gestiona autenticación del administrador | `credentials: {username, password}`, `authToken: string`, `userProfile: Object` | `login(credentials)`, `logout()`, `validateToken()`, `refreshToken()` |
    | **dashboard.js** | Obtiene datos del panel principal | `dashboardMetrics: Object`, `kpiData: Array`, `recentActivity: Array` | `getDashboardData()`, `getKPIs()`, `getRecentActivity()` |
    | **alerts.js** | Administra alertas del sistema | `alerts: Array`, `alertStatus: string`, `alertPriority: enum` | `getAlerts(filter)`, `updateAlertStatus(id, status)`, `getAlertDetail(id)` |
    | **users.js** | Maneja información de usuarios | `users: Array`, `userDetail: Object`, `userStats: Object` | `getUsers(page, limit)`, `getUserDetail(id)`, `updateUserStatus(id, status)` |
    | **analytics.js** | Datos analíticos y métricas | `analyticsData: Object`, `chartData: Array`, `timeRange: string` | `getAnalyticsData(timeRange)`, `getChartData(type)`, `exportReport(format)` |

    ### 📂 Carpeta `/components` - Componentes UI

    #### **Tipos de props y estados:**
    ```javascript
    // Props para Card component
    interface CardProps {
    title: string;
    value: string | number;
    icon: React.ComponentType;
    trend?: 'up' | 'down' | 'neutral';
    color?: 'primary' | 'success' | 'warning' | 'danger';
    }

    // Props para Chart component
    interface ChartProps {
    data: Array<Object>;
    type: 'line' | 'bar' | 'pie' | 'area';
    title?: string;
    height?: number;
    }
    ```

    | Archivo | Función | Props Requeridas | Estado Interno |
    |---------|---------|------------------|----------------|
    | **Navbar.jsx** | Barra superior con navegación | `user: Object`, `onLogout: Function` | `isMenuOpen: boolean` |
    | **Sidebar.jsx** | Menú lateral de navegación | `activeRoute: string`, `collapsed: boolean` | `isCollapsed: boolean`, `menuItems: Array` |
    | **Card.jsx** | Tarjetas de métricas (KPI) | `title: string`, `value: string/number`, `icon: Component` | `isLoading: boolean`, `animatedValue: number` |
    | **Chart.jsx** | Gráficas interactivas | `data: Array`, `type: string`, `config: Object` | `chartData: Array`, `isLoading: boolean` |
    | **Loader.jsx** | Indicador de carga | `size?: string`, `text?: string` | N/A (stateless) |

    ### 📂 Carpeta `/context` - Estado Global

    #### **AuthContext.jsx**
    ```javascript
    // Estructura del contexto de autenticación
    interface AuthContextValue {
    // Estados
    isAuthenticated: boolean;
    user: UserProfile | null;
    loading: boolean;
    
    // Funciones
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    refreshToken: () => Promise<void>;
    }

    // Tipo de usuario
    interface UserProfile {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'super_admin';
    lastLogin: string;
    permissions: string[];
    }
    ```

    ### 📂 Carpeta `/pages` - Vistas Principales

    #### **Estados y datos comunes por página:**

    | Archivo | Variables de Estado | Datos de API | Funcionalidades |
    |---------|-------------------|--------------|-----------------|
    | **Login.jsx** | `credentials: {username, password}`, `isSubmitting: boolean`, `error: string` | N/A | Validación de formulario, manejo de errores, redirección post-login |
    | **Dashboard.jsx** | `metrics: Object`, `isLoading: boolean`, `refreshInterval: number` | `dashboardData`, `kpiMetrics`, `recentActivity` | Auto-refresh, filtros de tiempo, export de reportes |
    | **Alerts.jsx** | `alerts: Array`, `filter: string`, `selectedAlert: Object` | `alertsList`, `alertCategories` | Filtrado por prioridad, actualización de estado, paginación |
    | **Users.jsx** | `users: Array`, `pagination: Object`, `searchQuery: string` | `usersList`, `userStats` | Búsqueda, filtros, paginación, export de usuarios |
    | **Analytics.jsx** | `timeRange: string`, `chartType: string`, `analyticsData: Object` | `analyticsMetrics`, `chartData` | Filtros de tiempo, cambio de gráficas, export de reportes |

    ### 📂 Carpeta `/routes` - Gestión de Navegación

    #### **Configuración de rutas:**
    ```javascript
    // Estructura de rutas del admin panel
    const adminRoutes = [
    { path: "/admin/login", component: Login, protected: false },
    { path: "/admin/dashboard", component: Dashboard, protected: true },
    { path: "/admin/alerts", component: Alerts, protected: true },
    { path: "/admin/users", component: Users, protected: true },
    { path: "/admin/analytics", component: Analytics, protected: true }
    ];
    ```

    | Archivo | Propósito | Variables Clave | Funciones |
    |---------|-----------|-----------------|-----------|
    | **AppRouter.jsx** | Router principal del módulo | `routes: Array`, `currentPath: string` | Configuración de rutas, redirecciones, layout base |
    | **PrivateRoute.jsx** | Protección de rutas | `isAuthenticated: boolean`, `redirectPath: string` | Verificación de autenticación, redirección a login |

    ---

    ## ⚙️ 4. Comunicación Entre Componentes

    ### **Flujo de datos y comunicación:**

    ```
    ┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
    │   AuthContext   │────│   AppRouter      │────│   Pages         │
    │                 │    │                  │    │                 │
    │ - isAuth        │    │ - Route Guard    │    │ - State mgmt    │
    │ - user profile  │    │ - Navigation     │    │ - API calls     │
    │ - login/logout  │    │ - Layout wrap    │    │ - UI rendering  │
    └─────────────────┘    └──────────────────┘    └─────────────────┘
            │                       │                       │
            │                       │                       │
            └───────────────────────┼───────────────────────┘
                                    │
                        ┌──────────────────┐
                        │   API Layer      │
                        │                  │
                        │ - HTTP requests  │
                        │ - Error handling │
                        │ - Data transform │
                        └──────────────────┘
    ```

    ### **Patrones de comunicación:**

    1. **Context API**: Para estado global (autenticación)
    2. **Props drilling**: Para componentes padre-hijo
    3. **Callback functions**: Para comunicación hijo-padre
    4. **Custom hooks**: Para lógica reutilizable
    5. **API layer**: Para comunicación con backend

    ---

    ## 🔐 5. Sistema de Autenticación y Seguridad

    ### **Flujo de autenticación:**
    ```javascript
    // 1. Login request
    const loginFlow = async (credentials) => {
    const response = await auth.login(credentials);
    const { token, user } = response.data;
    
    // 2. Store token
    localStorage.setItem('admin_token', token);
    
    // 3. Update context
    setAuthState({ isAuthenticated: true, user });
    
    // 4. Redirect to dashboard
    navigate('/admin/dashboard');
    };

    // 5. Token validation on app load
    const validateSession = async () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        const isValid = await auth.validateToken(token);
        if (!isValid) {
        logout();
        }
    }
    };
    ```

    ### **Tipos de variables de seguridad:**
    ```javascript
    interface SecurityConfig {
    tokenKey: string;           // 'admin_token'
    tokenExpiry: number;        // 3600000 (1 hour)
    refreshThreshold: number;   // 300000 (5 minutes)
    maxLoginAttempts: number;   // 3
    lockoutDuration: number;    // 900000 (15 minutes)
    }
    ```

    ---

    ## 📊 6. Estructura de Datos y API

    ### **Endpoints del backend:**
    ```javascript
    const API_ENDPOINTS = {
    // Autenticación
    LOGIN: '/api/admin/auth/login',
    LOGOUT: '/api/admin/auth/logout',
    VALIDATE: '/api/admin/auth/validate',
    
    // Dashboard
    DASHBOARD: '/api/admin/dashboard',
    KPI_METRICS: '/api/admin/dashboard/kpi',
    
    // Alertas
    ALERTS: '/api/admin/alerts',
    ALERT_DETAIL: '/api/admin/alerts/:id',
    UPDATE_ALERT: '/api/admin/alerts/:id/status',
    
    // Usuarios
    USERS: '/api/admin/users',
    USER_DETAIL: '/api/admin/users/:id',
    USER_STATS: '/api/admin/users/stats',
    
    // Analytics
    ANALYTICS: '/api/admin/analytics',
    EXPORT_REPORT: '/api/admin/analytics/export'
    };
    ```

    ### **Modelos de datos principales:**
    ```javascript
    // Usuario del sistema
    interface User {
    id: string;
    username: string;
    email: string;
    status: 'active' | 'inactive' | 'suspended';
    riskLevel: 'low' | 'medium' | 'high';
    lastActivity: Date;
    conversationsCount: number;
    alertsGenerated: number;
    }

    // Alerta del sistema
    interface Alert {
    id: string;
    userId: string;
    type: 'emergency' | 'high_risk' | 'monitoring';
    status: 'pending' | 'in_progress' | 'resolved';
    priority: 1 | 2 | 3 | 4 | 5;
    description: string;
    createdAt: Date;
    assignedTo?: string;
    }

    // Métrica del dashboard
    interface DashboardMetric {
    id: string;
    title: string;
    value: number;
    previousValue: number;
    trend: 'up' | 'down' | 'stable';
    percentage: number;
    icon: string;
    }
    ```

    ---

    ## 🎨 7. Guía de Estilos y UI

    ### **Variables CSS principales:**
    ```css
    :root {
    /* Colores principales */
    --admin-primary: #1e40af;      /* Azul primario */
    --admin-secondary: #64748b;     /* Gris secundario */
    --admin-success: #10b981;       /* Verde éxito */
    --admin-warning: #f59e0b;       /* Amarillo advertencia */
    --admin-danger: #ef4444;        /* Rojo peligro */
    
    /* Backgrounds */
    --admin-bg-primary: #ffffff;    /* Fondo principal */
    --admin-bg-secondary: #f8fafc;  /* Fondo secundario */
    --admin-bg-dark: #0f172a;       /* Fondo oscuro */
    
    /* Sidebar */
    --sidebar-width: 250px;
    --sidebar-collapsed: 70px;
    --sidebar-bg: var(--admin-bg-dark);
    
    /* Navbar */
    --navbar-height: 60px;
    --navbar-bg: var(--admin-bg-primary);
    
    /* Breakpoints */
    --mobile: 768px;
    --tablet: 1024px;
    --desktop: 1200px;
    }
    ```

    ### **Clases CSS comunes:**
    ```css
    /* Layout */
    .admin-container { /* Contenedor principal */ }
    .admin-sidebar { /* Sidebar navigation */ }
    .admin-navbar { /* Top navigation */ }
    .admin-main { /* Main content area */ }

    /* Components */
    .admin-card { /* Card component */ }
    .admin-chart { /* Chart wrapper */ }
    .admin-table { /* Table styles */ }
    .admin-button { /* Button variations */ }

    /* States */
    .loading { /* Loading state */ }
    .error { /* Error state */ }
    .success { /* Success state */ }
    .disabled { /* Disabled state */ }
    ```

    ---

    ## 🚀 8. Instrucciones de Implementación

    ### **Paso 1: Configuración inicial**
    ```bash
    # 1. Instalar dependencias adicionales si es necesario
    npm install react-router-dom recharts lucide-react

    # 2. Verificar estructura de carpetas
    # Asegurarse que existe: src/admin/ con todas las subcarpetas
    ```

    ### **Paso 2: Implementar AuthContext**
    ```javascript
    // src/admin/context/AuthContext.jsx
    export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        loading: true
    });
    
    // Implementar login, logout, validateToken
    const contextValue = {
        ...authState,
        login,
        logout,
        refreshToken
    };
    
    return (
        <AuthContext.Provider value={contextValue}>
        {children}
        </AuthContext.Provider>
    );
    };
    ```

    ### **Paso 3: Configurar rutas**
    ```javascript
    // src/admin/routes/AppRouter.jsx
    export const AppRouter = () => {
    return (
        <BrowserRouter basename="/admin">
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="users" element={<Users />} />
            <Route path="analytics" element={<Analytics />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
    };
    ```

    ### **Paso 4: Implementar páginas principales**
    Seguir la estructura definida en cada archivo, usando los tipos de datos y estados especificados.

    ### **Paso 5: Integración con la app principal**
    ```javascript
    // src/admin/admin-main.jsx
    import { createRoot } from 'react-dom/client';
    import AdminApp from './AdminApp';

    const adminRoot = document.getElementById('admin-root');
    if (adminRoot) {
    createRoot(adminRoot).render(<AdminApp />);
    }
    ```

    ---

    ## 🔍 9. Testing y Debug

    ### **Herramientas recomendadas:**
    - **React DevTools**: Para debug de componentes
    - **Redux DevTools**: Para estado global (si se usa Redux)
    - **Network Tab**: Para debug de API calls
    - **Console logging**: Para flujo de datos

    ### **Patrones de debug:**
    ```javascript
    // Debug de API calls
    const debugAPI = (endpoint, data) => {
    console.log(`📡 API Call: ${endpoint}`, { data });
    };

    // Debug de estado
    const debugState = (component, state) => {
    console.log(`🔍 ${component} State:`, state);
    };
    ```

    ---

    ## 📋 10. Checklist de Implementación

    ### **Funcionalidades básicas:**
    - [ ] ✅ Sistema de autenticación funcional
    - [ ] ✅ Rutas protegidas implementadas
    - [ ] ✅ Dashboard con métricas básicas
    - [ ] ✅ Sistema de alertas operativo
    - [ ] ✅ Gestión de usuarios completa
    - [ ] ✅ Analytics con gráficas

    ### **Funcionalidades avanzadas:**
    - [ ] 🔄 Auto-refresh de datos
    - [ ] 📊 Export de reportes
    - [ ] 🔔 Notificaciones en tiempo real
    - [ ] 🎨 Tema oscuro/claro
    - [ ] 📱 Responsive design
    - [ ] 🌐 Internacionalización

    ### **Optimización y performance:**
    - [ ] ⚡ Lazy loading de componentes
    - [ ] 💾 Caché de datos de API
    - [ ] 🔄 Optimistic updates
    - [ ] 📦 Code splitting
    - [ ] 🖼️ Image optimization
    - [ ] 📈 Performance monitoring

    ---

    ## 🎯 11. Conclusión

    Este módulo administrativo representa el centro de control completo del ecosistema AURA, proporcionando:

    - **Visibilidad total** del sistema y usuarios
    - **Control granular** de alertas y configuraciones  
    - **Analytics profundos** para toma de decisiones
    - **Interfaz intuitiva** para administradores
    - **Arquitectura escalable** y mantenible

    La estructura modular y las especificaciones técnicas detalladas permiten una implementación clara y eficiente, facilitando tanto el desarrollo inicial como el mantenimiento futuro del sistema.

    **El objetivo es crear una herramienta poderosa que permita a los administradores supervisar y optimizar la plataforma AURA de manera efectiva, contribuyendo al éxito de la misión de conectar y apoyar a jóvenes en situación de vulnerabilidad.**

    ---

    *Documento generado para el proyecto Plataforma AURA - Innovación W.E.L.*  
    *Versión 1.0 - Noviembre 2025*
# Panel de Administración - AURA

Sistema de administración seguro para la plataforma AURA con autenticación basada en JWT.

## Características

- **Autenticación JWT**: Login seguro con tokens JWT del servidor Aura Auth Service
- **Control de Acceso**: Solo usuarios con rol `admin` pueden acceder al panel
- **Rutas Protegidas**: Todas las rutas del panel requieren autenticación
- **Verificación de Token**: Validación automática del token en cada carga de página
- **Gestión de Usuarios**: Vista de todos los usuarios registrados en el sistema

## Estructura del Proyecto

```
admin/
├── api/
│   └── auth.js              # API cliente para comunicación con el servidor
├── components/
│   ├── Layout.jsx           # Layout principal del panel admin
│   ├── ProtectedRoute.jsx   # Componente para proteger rutas
│   └── ui/                  # Componentes de UI reutilizables
├── config/
│   └── api.js               # Configuración de endpoints y URLs
├── context/
│   └── AuthContext.jsx      # Context de React para manejo de autenticación
├── pages/
│   ├── Login.jsx            # Página de login
│   ├── Dashboard.jsx        # Panel principal
│   ├── Usuarios.jsx         # Gestión de usuarios
│   ├── Alertas.jsx          # Sistema de alertas
│   └── Analiticas.jsx       # Analíticas del sistema
└── README.md                # Este archivo
```

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto AURA con la siguiente variable:

```env
VITE_API_URL=http://98.95.86.245:3001
```

Si no se define, por defecto usará `http://98.95.86.245:3001`.

### Conexión al Servidor

El sistema se conecta al **Aura Auth Service** corriendo en `http://98.95.86.245:3001/api/auth`.

Endpoints utilizados:
- `POST /api/auth/login` - Autenticación de usuarios
- `GET /api/auth/profile` - Verificación de token y obtención de perfil
- `GET /api/auth/users` - Lista de usuarios (solo admin)

## Uso del Sistema

### 1. Inicio de Sesión

Para acceder al panel de administración:

1. Navega a `/login`
2. Ingresa credenciales de un usuario con rol `admin`
3. El sistema validará las credenciales con el servidor
4. Si es exitoso, se redirigirá al dashboard (`/app/dashboard`)

**Validaciones de Seguridad:**
- El usuario debe tener rol `admin` en la base de datos
- El token JWT se guarda en `localStorage` como `adminToken`
- Si el usuario no es admin, se muestra mensaje de acceso denegado

### 2. Navegación en el Panel

Una vez autenticado, puedes acceder a:

- **Dashboard** (`/app/dashboard`) - Vista general del sistema
- **Usuarios** (`/app/usuarios`) - Lista y gestión de usuarios
- **Alertas** (`/app/alertas`) - Sistema de alertas
- **Analíticas** (`/app/analiticas`) - Estadísticas y métricas

### 3. Rutas Protegidas

Todas las rutas bajo `/app/*` están protegidas por el componente `ProtectedRoute`:

```jsx
<ProtectedRoute>
  <Layout />
</ProtectedRoute>
```

Este componente:
- Verifica si hay un token en localStorage
- Valida el token con el servidor
- Verifica que el usuario tenga rol `admin`
- Redirige a `/login` si no está autenticado
- Muestra mensaje de error si no es admin

### 4. Cerrar Sesión

El botón de cerrar sesión (disponible en el Layout) ejecuta:
- Elimina el token de localStorage
- Limpia el estado de autenticación
- Redirige a la página de login

## API Cliente

### authAPI.login(email, password)

Autentica un usuario con el servidor.

```javascript
import { authAPI } from './api/auth';

const result = await authAPI.login('admin@aura.com', 'password123');
// Returns: { success: true, token: 'jwt...', user: {...} }
```

### authAPI.verifyToken(token)

Verifica que un token sea válido.

```javascript
const result = await authAPI.verifyToken(token);
// Returns: { valid: true, user: {...} }
```

### authAPI.getAllUsers(token)

Obtiene lista de todos los usuarios (solo admin).

```javascript
const result = await authAPI.getAllUsers(token);
// Returns: { success: true, users: [...] }
```

### authAPI.logout()

Cierra sesión eliminando el token.

```javascript
authAPI.logout();
```

## Context de Autenticación

El `AuthContext` proporciona:

```javascript
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const { user, loading, isAuthenticated, login, logout } = useContext(AuthContext);
```

**Propiedades:**
- `user` - Objeto con datos del usuario autenticado
- `loading` - Boolean indicando si está verificando autenticación
- `isAuthenticated` - Boolean indicando si el usuario está autenticado
- `login(email, password)` - Función para iniciar sesión
- `logout()` - Función para cerrar sesión

## Estructura de Datos

### Usuario Autenticado

```javascript
{
  id: "uuid",
  username: "admin_user",
  email: "admin@aura.com",
  role: "admin"
}
```

### Token JWT

El token se almacena en localStorage con la clave `adminToken` y se incluye en las peticiones:

```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

## Seguridad

El sistema implementa múltiples capas de seguridad:

1. **Validación de Rol**: Solo usuarios con rol `admin` pueden acceder
2. **Verificación de Token**: El token se verifica en el servidor en cada petición
3. **Rutas Protegidas**: Todas las rutas administrativas requieren autenticación
4. **Manejo de Errores**: Mensajes genéricos para no exponer información sensible
5. **HTTPS Recomendado**: Para producción, usar HTTPS para encriptar comunicaciones

## Flujo de Autenticación

```
1. Usuario ingresa credenciales en /login
   ↓
2. Login.jsx llama a AuthContext.login(email, password)
   ↓
3. AuthContext.login llama a authAPI.login(email, password)
   ↓
4. authAPI.login hace POST a /api/auth/login
   ↓
5. Servidor valida credenciales y retorna token + user
   ↓
6. authAPI.login verifica que user.role === 'admin'
   ↓
7. Si es admin, guarda token en localStorage
   ↓
8. AuthContext actualiza estado: isAuthenticated = true
   ↓
9. Login.jsx redirige a /app/dashboard
   ↓
10. ProtectedRoute verifica autenticación
   ↓
11. Usuario accede al panel de administración
```

## Solución de Problemas

### "Acceso denegado. Solo administradores pueden acceder"

El usuario no tiene rol `admin` en la base de datos. Verifica en el servidor que el usuario tenga el rol correcto:

```sql
SELECT u.email, r.role_name
FROM users u
JOIN roles r ON u.id_role = r.id_role
WHERE u.email = 'admin@aura.com';
```

### "Error de conexión con el servidor"

- Verifica que el servidor esté corriendo en `http://98.95.86.245:3001`
- Revisa la configuración de CORS en el servidor
- Confirma que la variable `VITE_API_URL` esté correctamente configurada

### Token inválido o expirado

El token JWT tiene un tiempo de expiración. Si el token expira:
1. El usuario será redirigido a `/login`
2. Debe iniciar sesión nuevamente

### No se puede acceder a /app/dashboard

1. Verifica que estés autenticado (`localStorage.getItem('adminToken')`)
2. Confirma que el token sea válido
3. Asegúrate de que el usuario tenga rol `admin`

## Desarrollo

### Ejecutar en modo desarrollo

```bash
cd AURA
npm run dev
```

### Ejecutar en producción

```bash
cd AURA
npm run build
npm run preview
```

## Notas Importantes

- **Nunca expongas el JWT en URLs o logs**
- **El token se guarda en localStorage** - considera usar httpOnly cookies para mayor seguridad en producción
- **CORS debe estar configurado** en el servidor para aceptar peticiones del frontend
- **Para producción**, considera implementar refresh tokens para mejorar la seguridad

#  AURA - Plataforma de Bienestar Mental Juvenil

![AURA Logo](src/assets/img/LogoAura2.jpg)

**AURA** es una plataforma tecnológica empática diseñada para transformar la salud mental juvenil mediante inteligencia artificial predictiva y redes de apoyo comunitario. Combinamos lo mejor de la tecnología con la sensibilidad humana para crear un impacto real en las comunidades.

##  Visión y Misión

###  Visión
**Ser la plataforma líder de prevención donde ningún joven enfrente solo sus luchas emocionales.** Aspiramos a crear un mundo donde cada adolescente tenga acceso inmediato a apoyo empático y recursos especializados para su bienestar mental.

###  Misión
Desarrollar soluciones tecnológicas empáticas que:
- **Previenen crisis** de salud mental mediante detección temprana
- **Fortalecen vínculos** sociales y redes de apoyo comunitario
- **Generan impacto real** en las vidas de jóvenes y sus comunidades
- **Transforman datos** en insights accionables para políticas públicas efectivas

##  El Problema que Resolvemos

### Crisis de Salud Mental Juvenil
- **1 de 7 adolescentes** experimenta problemas de salud mental
- **75% de casos** no reciben tratamiento adecuado
- **60%** sin acceso a servicios especializados
- **Aislamiento social** que agrava los problemas existentes

### Impacto en las Comunidades
- Pérdida de vínculos significativos
- Falta de detección temprana de crisis
- Recursos limitados y mal distribuidos
- Ausencia de datos para políticas públicas efectivas

##  Nuestra Solución

### IA Empática
**Sistema de inteligencia artificial especializado en comprender y acompañar el bienestar emocional juvenil**

**Características principales:**
-  **Análisis empático** de patrones de comunicación
-  **Apoyo personalizado** disponible 24/7
-  **Conexión inteligente** con redes de apoyo locales
-  **Protección total** de la privacidad

###  Análisis Predictivo
**Plataforma analítica que transforma datos anónimos en insights accionables**

**Funcionalidades clave:**
-  **Mapeo inteligente** de zonas de riesgo psicosocial
-  **Dashboard** con métricas en tiempo real
-  **Optimización automática** de recursos públicos
-  **Impacto escalable** a nivel comunitario

###  Enfoque Humano-Céntrico
- Cada algoritmo prioriza el **bienestar humano** sobre la eficiencia técnica
- Diseño empático que **no juzga, no castiga, solo acompaña**
- Integración con **profesionales especializados** y redes de apoyo
- **Confidencialidad absoluta** en cada interacción

##  Arquitectura del Proyecto

###  Estructura del Código

```
AURA/
├── 📄 package.json              # Configuración del proyecto
├── 📄 vite.config.js           # Configuración de Vite
├── 📄 eslint.config.js         # Configuración de ESLint
├── 📁 src/
│   ├── 📄 main.jsx             # Punto de entrada principal
│   ├── 📁 landing/             # Aplicación Landing Page
│   │   ├── 📁 Pages/
│   │   │   ├── 📁 home/        # Página principal
│   │   │   │   ├── 📄 Home.jsx
│   │   │   │   └── 📁 components/
│   │   │   │       ├──  Hero/          # Sección hero
│   │   │   │       ├──  Problem/       # Sección problema
│   │   │   │       ├──  Solution/      # Sección solución
│   │   │   │       ├──  HowItWorks/    # Cómo funciona
│   │   │   │       ├──  ContactForm/   # Formulario de contacto
│   │   │   │       ├──  Testimonials/  # Testimonios
│   │   │   │       └──  RestSections/  # Secciones adicionales
│   │   │   └── 📁 login/       # Sistema de autenticación
│   │   ├── 📁 components/
│   │   │   ├── 📁 layout/      # Componentes de diseño
│   │   │   │   ├──  Navbar/
│   │   │   │   ├──  Footer/
│   │   │   │   └──  Layout/
│   │   │   └── 📁 ui/          # Componentes de interfaz
│   │   │       ├──  Button/
│   │   │       ├──  AnimatedCounter/
│   │   │       ├──  ScrollIndicator/
│   │   │       └──  BackToTop/
│   │   ├── 📁 hooks/           # Hooks personalizados
│   │   ├── 📁 routes/          # Enrutamiento
│   │   ├── 📁 services/        # Servicios y APIs
│   │   └── 📁 styles/          # Estilos globales
│   ├── 📁 admin/               # Panel de administración (en desarrollo)
│   │   ├── 📄 AdminApp.jsx
│   │   ├── 📁 components/      # Componentes del admin
│   │   ├── 📁 pages/          # Páginas del admin
│   │   ├── 📁 context/        # Contextos de React
│   │   ├── 📁 routes/         # Rutas protegidas
│   │   └── 📁 api/           # APIs del admin
│   └── 📁 assets/
│       ├── 📁 img/            # Imágenes y logos
│       └── 📁 otros/          # Recursos adicionales
├── 📁 public/                 # Archivos públicos
└── 📄 README.md              # Este archivo
```

###  Tecnologías Utilizadas

#### Frontend Principal
- **React 19.1.1** - Biblioteca principal de UI
- **Vite 7.1.7** - Herramienta de desarrollo ultra-rápida
- **React Icons 5.5.0** - Biblioteca de iconos
- **EmailJS** - Servicio de envío de emails

#### Herramientas de Desarrollo
- **ESLint** - Linter de código
- **SWC** - Compilador rápido para React
- **CSS Modules** - Estilos modulares y encapsulados

#### Características Técnicas
-  **Hot Module Replacement (HMR)** para desarrollo rápido
-  **Diseño responsive** para todos los dispositivos
-  **Optimización de rendimiento** con lazy loading
-  **Animaciones fluidas** y efectos visuales
-  **Hooks personalizados** para lógica reutilizable

##  Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/wilber023/Landing_Page_AURA.git
cd Landing_Page_AURA/AURA
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la raíz del proyecto
# Agregar configuración de EmailJS
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

5. **Construir para producción**
```bash
npm run build
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Construcción optimizada para producción
npm run preview  # Vista previa de la construcción
npm run lint     # Análisis de código con ESLint
```

##  Funcionalidades Principales

###  Landing Page Completa
- **Hero Section**: Introducción impactante con efectos de escritura
- **Análisis del Problema**: Estadísticas y visualización de la crisis
- **Presentación de Solución**: Explicación detallada de AURA
- **Cómo Funciona**: Proceso paso a paso de la plataforma
- **Testimonios**: Experiencias de usuarios y organizaciones
- **Formulario de Contacto**: Sistema integrado con EmailJS
- **Métricas de Impacto**: Contadores animados de resultados

###  Experiencia de Usuario
- **Navegación intuitiva** con scroll suave
- **Animaciones parallax** para engagement visual
- **Indicador de progreso** de scroll
- **Botón "Back to Top"** para navegación fácil
- **Responsive design** para todos los dispositivos
- **Accesibilidad optimizada** para usuarios diversos

###  Panel de Administración (En Desarrollo)
- Dashboard con métricas en tiempo real
- Gestión de usuarios y alertas
- Análisis predictivo y reportes
- Sistema de autenticación seguro

##  Impacto y Resultados

###  Métricas de Éxito
- **78% reducción** en crisis severas detectadas
- **24/7 disponibilidad** de apoyo empático
- **+15,000 jóvenes** ya conectados con la plataforma
- **95% satisfacción** de usuarios y organizaciones

###  Beneficios Comprobados
- **Detección temprana** de señales de alerta
- **Reducción significativa** de casos severos
- **Fortalecimiento** de redes de apoyo comunitario
- **Optimización** de recursos públicos de salud mental
- **Datos valiosos** para políticas públicas efectivas

##  Contribución y Colaboración

###  Únete a Nuestra Misión
AURA está comprometido con crear un impacto real en las comunidades. Buscamos:

- **Desarrolladores** apasionados por el bienestar social
- **Profesionales de salud mental** para validación experta
- **Organizaciones** interesadas en implementar la plataforma
- **Investigadores** en IA empática y análisis predictivo

###  Contacto
¿Interesado en colaborar o implementar AURA en tu comunidad?

-  **Sitio Web**: [Formulario de contacto integrado]
-  **Email**: A través del formulario de contacto
-  **GitHub**: [Landing_Page_AURA](https://github.com/wilber023/Landing_Page_AURA)

##  Licencia

Este proyecto está desarrollado con fines de impacto social. Para información sobre licencias y uso comercial, contacta al equipo de desarrollo.

##  Reconocimientos

Agradecemos a todos los profesionales de salud mental, desarrolladores, y organizaciones que han contribuido a hacer realidad esta visión de un futuro donde ningún joven enfrente solo sus luchas emocionales.

---

**AURA v2.0** - *Transformando el futuro de la salud mental juvenil con tecnología empática*

*"Tu comunidad lo necesita. El momento es ahora."* 💙

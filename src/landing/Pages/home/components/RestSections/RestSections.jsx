import img4 from '../../../../../assets/img/img4.jpg';
import img5 from '../../../../../assets/img/img5.jpg';
import representacion from '../../../../../assets/img/representacion.jpg';
import Button from '../../../../components/ui/Button';
import './RestSections.css';

const Impact = () => {
  const metrics = [
    { value: '85%', label: 'Reducción en tiempo de detección de riesgos' },
    { value: '70%', label: 'Mejora en conexión social de usuarios' },
    { value: '60%', label: 'Optimización en asignación de recursos' },
    { value: '95%', label: 'Satisfacción de usuarios con el sistema' }
  ];

  const benefits = [
    {
      title: 'Prevención temprana efectiva',
      description: 'Identificación y abordaje de señales de riesgo antes de que evolucionen hacia crisis severas, mejorando significativamente los pronósticos a largo plazo.'
    },
    {
      title: 'Democratización del acceso',
      description: 'Extensión de servicios de apoyo psicosocial a comunidades donde los recursos profesionales son limitados, eliminando barreras geográficas y económicas.'
    },
    {
      title: 'Fortalecimiento comunitario',
      description: 'Creación de redes de apoyo sostenibles que fomentan el liderazgo local y la resiliencia comunitaria a través de mentores juveniles capacitados.'
    }
  ];

  return (
<section id="impacto" className="section impact-section">
  <div className="container">
    <div className="impact-header">
      <div className="impact-text">
        <span className="section-title">Nuestro Impacto</span>
        <h2 className="section-description">Transformando el futuro de la salud mental juvenil</h2>
        <p className="section-description">
          Resultados cuantificables que nos acercan a nuestra visión: <strong>ser la plataforma líder de prevención en donde ningún joven enfrente solo sus luchas emocionales.</strong> Cada métrica representa vidas transformadas y comunidades fortalecidas.
        </p>
      </div>
      <div className="impact-visual">
        <img 
          src={img4} 
          alt="Comunidad de jóvenes conectados y saludables" 
          className="impact-image"
        />
      </div>
    </div>

    

    <div className="impact-benefits">
      {benefits.map((benefit, index) => (
        <div key={index} className="benefit-card">
          <h3>{benefit.title}</h3>
          <p>{benefit.description}</p>
        </div>
      ))}
    </div>
 

  </div>
</section>
  );
};

// Componente Inspiration
const Inspiration = () => {
  return (
    <section className="section inspiration-section">
      <div className="container">
        <div className="inspiration-header">
          <h2 className="section-title">Jóvenes conectados construyendo un futuro mejor juntos</h2>
          <p className="section-description">
            "Cada historia de superación comienza con un paso hacia la conexión"
          </p>
        </div>
        
        <div className="inspiration-content">
          <div className="inspiration-image">
            <img 
              src={representacion} 
              alt="Jóvenes conectados construyendo un futuro mejor juntos" 
              className="representation-image"
            />
          </div>
          <div className="inspiration-text">
            <blockquote className="inspiration-quote">
              Tu pasado no define tu futuro. En cada momento difícil existe una oportunidad de reconexión, 
              de encontrar tu propósito y de descubrir que no estás solo en este camino.
            </blockquote>
            <p className="inspiration-message">
              <strong>Juntos podemos transformar la vulnerabilidad en fortaleza.</strong>
            </p>
            <div className="inspiration-stats">
              <div className="stat-item">
                <span className="stat-highlight">Miles</span>
                <span className="stat-description">de jóvenes han encontrado esperanza</span>
              </div>
              <div className="stat-item">
                <span className="stat-highlight">Cada día</span>
                <span className="stat-description">nuevas conexiones transforman vidas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente Privacy
const Privacy = () => {
  const privacyFeatures = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <circle cx="12" cy="16" r="1"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      title: 'Cifrado de extremo a extremo',
      description: 'Toda la información personal y las conversaciones están protegidas con cifrado avanzado, garantizando que solo el usuario tiene acceso a sus datos.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/>
          <line x1="20" y1="8" x2="20" y2="14"/>
          <line x1="23" y1="11" x2="17" y2="11"/>
        </svg>
      ),
      title: 'Control total de datos',
      description: 'Los usuarios mantienen el control absoluto sobre qué información comparten y pueden modificar o eliminar sus datos en cualquier momento.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      ),
      title: 'Anonimización inteligente',
      description: 'Los datos utilizados para análisis de salud pública están completamente anonimizados, protegiendo la identidad individual mientras se preserva la utilidad científica.'
    }
  ];

  return (
    <section id="privacidad" className="section privacy-section">
      <div className="container">
        <h2 className="section-title">Privacidad y confianza como fundamentos</h2>
        <p className="section-description">
          Entendemos que la confianza es esencial para el éxito de nuestra plataforma. Por eso implementamos los más altos 
          estándares de protección de datos y garantizamos el control total del usuario sobre su información personal.
        </p>

        <div className="privacy-features">
          {privacyFeatures.map((feature, index) => (
            <div key={index} className="privacy-card">
              <div className="privacy-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente CTA
const CTA = () => {
  return (
    <section id="contacto" className="section cta-final">
      <div className="container">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para liderar el cambio?</h2>
            <p className="cta-description">
              No esperes a que la crisis se agrave. Únete a las organizaciones líderes que ya están 
              transformando vidas con AURA. <strong>Tu comunidad lo necesita. El momento es ahora.</strong>
            </p>
            <div className="cta-actions">
              <Button 
                onClick={() => {
                  const formulario = document.getElementById('contacto-form');
                  if (formulario) {
                    formulario.scrollIntoView({ 
                      behavior: 'smooth', 
                      block: 'start' 
                    });
                  }
                }}
                variant="primary" 
                size="large"
              >
                Solicitar Información
              </Button>
            </div>
          </div>
          <div className="cta-visual">
            <img 
              src={img5} 
              alt="Equipo profesional trabajando en soluciones tecnológicas" 
              className="cta-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Impact, Inspiration, Privacy, CTA };
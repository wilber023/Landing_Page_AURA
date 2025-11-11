import img3 from '../../../../../assets/img/img3.jpg';
import { 
  FaBrain, 
  FaChartLine, 
  FaComments, 
  FaClock, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaTachometerAlt, 
  FaBalanceScale,
  FaShieldAlt,
  FaHeart,
  FaGlobe
} from 'react-icons/fa';
import './Solution.css';

const Solution = () => {
  const solutionCards = [
    {
      title: 'IA Empática',
      icon: <FaBrain />,
      description: 'Sistema de inteligencia artificial especializado en comprender y acompañar el bienestar emocional juvenil con sensibilidad humana.',
      detailedDescription: 'Nuestra IA no juzga, no castiga, solo acompaña. Utilizando procesamiento de lenguaje natural avanzado, identifica señales tempranas de vulnerabilidad mientras mantiene un diálogo empático y respetuoso.',
      features: [
        { icon: <FaClock />, text: 'Apoyo personalizado disponible 24/7', description: 'Respuesta inmediata en momentos críticos, sin esperas' },
        { icon: <FaUsers />, text: 'Conexión inteligente con redes de apoyo locales', description: 'Vincula automáticamente con recursos comunitarios apropiados' },
        { icon: <FaShieldAlt />, text: 'Protección total de la privacidad', description: 'Confidencialidad absoluta en cada interacción' }
      ],
      isPrimary: true
    },
    {
      title: 'Análisis Predictivo',
      icon: <FaChartLine />,
      description: 'Plataforma analítica que transforma datos anónimos en insights accionables para políticas públicas de salud mental efectivas.',
      detailedDescription: 'Identifica patrones y tendencias comunitarias sin comprometer la privacidad individual, permitiendo intervenciones preventivas a gran escala.',
      features: [
        { icon: <FaTachometerAlt />, text: 'Dashboard con métricas en tiempo real', description: 'Monitoreo continuo del bienestar comunitario' },
        { icon: <FaGlobe />, text: 'Impacto escalable a nivel comunitario', description: 'Soluciones que crecen con las necesidades de la población' }
      ],
      isPrimary: false
    }
  ];

  const additionalFeatures = [
    {
      icon: <FaHeart />,
      title: 'Enfoque Humano-Céntrico',
      description: 'Cada algoritmo está diseñado poniendo el bienestar humano en el centro, no la eficiencia técnica.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Ética y Transparencia',
      description: 'Código abierto, auditable y diseñado bajo los más altos estándares éticos.'
    },
    {
      icon: <FaUsers />,
      title: 'Colaboración Comunitaria',
      description: 'Fortalece las redes existentes en lugar de reemplazarlas, potenciando el capital social local.'
    }
  ];

  return (
    <section id="solucion" className="section solution-section">
      <div className="container">
        <div className="solution-header">
          <div className="solution-text">
            <h2 className="section-title">Tecnología empática al servicio de la humanidad</h2>
            <p className="section-description">
              AURA combina lo mejor de la inteligencia artificial con la sensibilidad humana para crear 
              un ecosistema de prevención y apoyo que realmente funciona. No es solo tecnología, 
              es esperanza transformada en acción.
            </p>
          </div>
          <div className="solution-visual">
            <img 
              src={img3} 
              alt="Tecnología de inteligencia artificial para salud mental" 
              className="solution-image"
            />
          </div>
        </div>

        <div className="solution-cards-container">
          {solutionCards.map((card, index) => (
            <div key={index} className={`solution-card-enhanced ${card.isPrimary ? 'primary' : 'secondary'}`}>
              <div className="card-header">
                <div className="card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
              </div>
              
              <p className="card-description">{card.description}</p>
              <p className="card-detailed-description">{card.detailedDescription}</p>
              
              <div className="features-grid">
                {card.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="feature-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-content">
                      <h4>{feature.text}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="additional-features">
          <h3 className="additional-features-title">Principios que nos guían</h3>
          <div className="additional-features-grid">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="additional-feature-card">
                <div className="additional-feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
import './HowItWorks.css';

const HowItWorks = () => {
  const processSteps = [
    {
      number: '01',
      title: 'Detección empática temprana',
      description: 'Nuestros algoritmos de procesamiento de lenguaje natural analizan patrones de comunicación para identificar señales de vulnerabilidad emocional de manera respetuosa y confidencial.'
    },
    {
      number: '02',
      title: 'Recomendaciones personalizadas',
      description: 'El sistema genera sugerencias contextualizadas de actividades, grupos y recursos disponibles en el entorno local del joven, promoviendo la reconexión social positiva.'
    }, 
    {
      number: '03',
      title: 'Optimización de políticas públicas',
      description: 'Los datos anónimos agregados permiten a las autoridades de salud identificar tendencias y optimizar la asignación de recursos comunitarios.'
    }
  ];

  return (
    <section id="funcionamiento" className="section how-it-works">
      <div className="container">
        <h2 className="section-title">Cómo transformamos vidas</h2>
        <p className="section-description">
          Un proceso integral que combina tecnología avanzada con comprensión humana profunda para generar cambios positivos sostenibles.
        </p>

        <div className="process-flow">
          {processSteps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
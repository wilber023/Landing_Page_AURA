import img2 from '../../../../../assets/img/img2.jpg';
import './Problem.css';

const Problem = () => {
  const stats = [
    { number: '1 de 7', label: 'adolescentes con problemas de salud mental' },
    { number: '12-16', label: 'años de inicio promedio de consumo' },
    { number: '60%', label: 'sin acceso a servicios de salud mental' }
  ];

  const problems = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      ),
      title: 'Enfoques punitivos inefectivos',
      description: 'Los programas tradicionales basados en prohibición y castigo generan rechazo y desconfianza entre los jóvenes, limitando su efectividad.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: 'Barreras de acceso sistemáticas',
      description: 'Altos costos, estigmatización social y disponibilidad limitada en comunidades vulnerables impiden el acceso oportuno a la ayuda.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Aislamiento y desconexión social',
      description: 'La pérdida de vínculos significativos agrava los problemas de salud mental, creando un ciclo de deterioro y desesperanza.'
    }
  ];

  return (
    <section id="problema" className="section problem-section">
      <div className="container">
        <div className="section-header">
          <div className="section-text">
            <h2 className="section-title">Crisis silenciosa que demanda acción inmediata</h2>
            <p className="section-description">
              Cada día que pasa sin detección temprana, más jóvenes desarrollan crisis severas. 
              Los métodos tradicionales no funcionan a la escala necesaria. <strong>Es momento de actuar.</strong>
            </p>
          </div>
          <div className="section-image">
            <img 
              src={img2} 
              alt="Análisis de datos para salud mental juvenil" 
              className="problem-image"
            />
          </div>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card fade-in" data-delay={index * 100}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="problems-grid">
          {problems.map((problem, index) => (
            <div key={index} className="problem-card fade-in" data-delay={index * 100}>
              <div className="problem-icon">
                {problem.icon}
              </div>
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
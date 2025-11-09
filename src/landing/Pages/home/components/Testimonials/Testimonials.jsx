import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "AURA transformó completamente nuestra capacidad de detección temprana. En 6 meses redujimos las crisis severas en un 78%.",
      author: "Dr. María González",
      position: "Directora de Salud Mental",
      organization: "Hospital Regional San Juan",
      avatar: "MG"
    },
    {
      quote: "La implementación fue sorprendentemente rápida. En 3 semanas estábamos operativos y viendo resultados inmediatos.",
      author: "Carlos Mendoza",
      position: "Coordinador de Programas",
      organization: "ONG Juventud en Acción",
      avatar: "CM"
    },
    {
      quote: "El ROI fue evidente desde el primer trimestre. Ahora podemos asignar recursos de manera inteligente y preventiva.",
      author: "Ana Patricia Ruiz",
      position: "Secretaria de Salud",
      organization: "Municipio de Valle Verde",
      avatar: "AR"
    }
  ];

  const stats = [
    { number: "50+", label: "Organizaciones confiaron en nosotros" },
    { number: "15,000+", label: "Jóvenes beneficiados directamente" },
    { number: "98%", label: "Tasa de satisfacción del cliente" },
    { number: "< 30 días", label: "Tiempo promedio de implementación" }
  ];

  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <h2 className="section-title">Organizaciones líderes ya confían en AURA</h2>
          <p className="section-description">
            Descubre por qué directores de salud, coordinadores de programas y líderes gubernamentales 
            eligen AURA para transformar sus resultados
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-quote">
                <span className="quote-mark">"</span>
                {testimonial.quote}
                <span className="quote-mark">"</span>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-position">{testimonial.position}</div>
                  <div className="author-organization">{testimonial.organization}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="social-proof-stats">
          {stats.map((stat, index) => (
            <div key={index} className="proof-stat">
              <div className="proof-number">{stat.number}</div>
              <div className="proof-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
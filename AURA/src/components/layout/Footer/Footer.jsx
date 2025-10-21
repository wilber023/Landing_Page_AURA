import './Footer.css';

const Footer = () => {
  const footerLinks = {
    plataforma: [
      { href: '#problema', text: 'Problemática' },
      { href: '#solucion', text: 'Solución' },
      { href: '#funcionamiento', text: 'Funcionamiento' },
      { href: '#impacto', text: 'Impacto Social' }
    ],
    compromiso: [
      { href: '#privacidad', text: 'Privacidad' },
      { href: '#etica', text: 'Ética en IA' },
      { href: '#transparencia', text: 'Transparencia' },
      { href: '#accesibilidad', text: 'Accesibilidad' }
    ],
    contacto: [
      { href: 'mailto:contacto@reconexionhumana.org', text: 'Información general' },
      { href: 'mailto:colaboraciones@reconexionhumana.org', text: 'Colaboraciones' },
      { href: 'mailto:prensa@reconexionhumana.org', text: 'Prensa' }
    ]
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">Reconexión Humana</div>
            <p className="footer-description">
              Plataforma integral para la prevención de adicciones y el fortalecimiento de la salud mental juvenil 
              a través de inteligencia artificial empática y análisis predictivo para la optimización de políticas públicas.
            </p>
          </div>
          
          <div className="footer-links-section">
            <div className="footer-column">
              <h4>Plataforma</h4>
              <ul>
                {footerLinks.plataforma.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Compromiso</h4>
              <ul>
                {footerLinks.compromiso.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Contacto</h4>
              <ul>
                {footerLinks.contacto.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Plataforma de Reconexión Humana. Comprometidos con la transformación positiva de la salud mental juvenil.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
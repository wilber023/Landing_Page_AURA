import './Footer.css';
import { 
  FaHeart, 
  FaShieldAlt, 
  FaUsers, 
  FaBrain,
  FaLock,
  FaBalanceScale,
  FaEye,
  FaUniversalAccess,
  FaEnvelope,
  FaHandshake,
  FaNewspaper,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaGithub
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { 
  MdHealthAndSafety, 
  MdVerifiedUser,
  MdLocationOn 
} from 'react-icons/md';
import { IoShieldCheckmark } from 'react-icons/io5';
import { HiSparkles } from 'react-icons/hi2';
import { Privacy } from '../../../Pages/home/components/RestSections';

const Footer = () => {
  const footerLinks = {
    plataforma: [
      { href: '#problema', text: 'Problemática', icon: <FaBrain /> },
      { href: '#solucion', text: 'Solución', icon: <HiSparkles /> },
      { href: '#funcionamiento', text: 'Funcionamiento', icon: <MdHealthAndSafety /> },
      { href: '#impacto', text: 'Impacto Social', icon: <FaUsers /> }
    ],
    compromiso: [
      { href: '#privacidad', text: 'Privacidad', icon: <FaLock /> },
      { href: '#etica', text: 'Ética en IA', icon: <FaBalanceScale /> },
      { href: '#transparencia', text: 'Transparencia', icon: <FaEye /> },
    ],
    contacto: [
      { href: 'mailto:contacto@plataformaaura.org', text: 'Información general', icon: <FaEnvelope /> },
      { href: 'mailto:colaboraciones@plataformaaura.org', text: 'Colaboraciones', icon: <FaHandshake /> },

    ]
  };

  const socialLinks = [
    { href: 'https://linkedin.com/company/aura-platform', icon: <FaLinkedin />, label: 'LinkedIn' },
    { href: 'https://twitter.com/aura_platform', icon: <FaTwitter />, label: 'Twitter' },
    { href: 'https://instagram.com/aura_plataforma', icon: <FaInstagram />, label: 'Instagram' },
  ];

  const certifications = [
    {
      icon: <IoShieldCheckmark />,
      title: 'ISO 27001:2022',
      description: 'Seguridad de la Información'
    },
    {
      icon: <MdVerifiedUser />,
      title: 'ISO 13485:2016',
      description: 'Dispositivos Médicos'
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#home" className="logo">AURA</a>
            <p className="logo-subtitle">Análisis y Reconexión Humana Asistida</p>
            <p className="footer-description">
              Plataforma integral para la prevención de adicciones y el fortalecimiento de la salud mental juvenil 
              a través de inteligencia artificial empática y análisis predictivo para la optimización de políticas públicas.
            </p>
            
            
            <div className="footer-social">
              <p className="social-title">Síguenos en redes</p>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="social-link"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="footer-links-section">
            <div className="footer-column">
              <h4>
                <FaShieldAlt className="section-icon" />
                Plataforma
              </h4>
              <ul>
                {footerLinks.plataforma.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>
                      <span className="link-icon">{link.icon}</span>
                      <span className="link-text">{link.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>
                <FaHeart className="section-icon" />
                Compromiso
              </h4>
              <ul>
                {footerLinks.compromiso.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>
                      <span className="link-icon">{link.icon}</span>
                      <span className="link-text">{link.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>
                <MdLocationOn className="section-icon" />
                Contacto
              </h4>
              <ul>
                {footerLinks.contacto.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>
                      <span className="link-icon">{link.icon}</span>
                      <span className="link-text">{link.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
              
              
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; 2025 AURA - Plataforma de Reconexión Humana.
              <span className="commitment"> Comprometidos con la transformación positiva de la salud mental juvenil.</span>
            </p>
            
          <div className="footer-legal">
            <Link to="/privacidad">Términos de Uso</Link> 
            <span className="separator">|</span> 
              <Link to="/privacidad">Aviso de Privacidad</Link>
          </div> 
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
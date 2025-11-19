import { useEffect } from 'react';
import Button from '../../ui/Button';
import logo from '../../../../assets/img/LogoAura2.jpg';
import { useMobileMenu, useNavbarEffects, useSmoothScroll } from '../../../hooks';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  const { isScrolled, isHidden } = useNavbarEffects();
  
  // Initialize smooth scrolling
  useSmoothScroll();

  // Función para manejar el scroll suave y cerrar el menú
  const handleLinkClick = (href, e) => {
    e.preventDefault();
    closeMenu();
    
    // Pequeño delay para que el menú se cierre primero
    setTimeout(() => {
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 300); // Tiempo para que se cierre el menú
  };

  const navLinks = [
    { href: '#problema', text: 'Problemática' },
    { href: '#solucion', text: 'Solución' },
    { href: '#funcionamiento', text: 'Funcionamiento' },
    { href: '#impacto', text: 'Impacto' },
    { href: '#privacidad', text: 'Privacidad' }
  ];

  // Update active nav link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPosition >= top && scrollPosition < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`nav ${isScrolled ? 'scrolled' : ''}`}
      style={{ 
        transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="nav-container">
        <div className="logo">
          <Link to={"/acceso-feed"}>
          <img className="logo-icon" src={logo} alt="AURA Logo" />
          </Link>
             
        </div>
        
        <ul className="nav-links">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a href={link.href} onClick={closeMenu}>
                {link.text}
              </a>
            </li>
          ))}
          <li>
            <Button 
              onClick={() => {
                const formulario = document.getElementById('contacto-form');
                if (formulario) {
                  formulario.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                  });
                }
                closeMenu();
              }}
              variant="primary" 
              size="small"
              className="nav-cta"
            >
              Contacto
            </Button>
          </li>
        </ul>

        {/* Mobile Menu Overlay */}
        {isOpen && <div className="mobile-menu-overlay" onClick={closeMenu}></div>}
        
        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <div className="mobile-menu-links">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                onClick={(e) => handleLinkClick(link.href, e)}
              >
                {link.text}
              </a>
            ))}
          </div>
          <div className="mobile-menu-actions">
            <Button 
              onClick={() => {
                const formulario = document.getElementById('contacto-form');
                if (formulario) {
                  formulario.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                  });
                }
                closeMenu();
              }}
              variant="primary" 
              size="medium"
              className="mobile-cta"
            >
              Contacto
            </Button>
          </div>
        </div>
        
        <button 
          className={`mobile-menu-toggle ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
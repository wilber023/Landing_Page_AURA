import { useEffect } from 'react';
import Button from '../../ui/Button';
import { useMobileMenu, useNavbarEffects, useSmoothScroll } from '../../../hooks';
import './Navbar.css';

const Navbar = () => {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  const { isScrolled, isHidden } = useNavbarEffects();
  
  // Initialize smooth scrolling
  useSmoothScroll();

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
          <span className="logo-text">Reconexión Humana</span>
        </div>
        
        <ul className={`nav-links ${isOpen ? 'mobile-active' : ''}`}>
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
        
        <button 
          className={`mobile-menu-toggle ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Abrir menú"
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
import { useEffect } from 'react';
import Button from '../../../../components/ui/Button';
import { useParallax, useTypingEffect } from '../../../../hooks';
import img1 from '../../../../../assets/img/img1.jpg';
import './Hero.css';

const Hero = () => {
  const parallaxRef = useParallax(0.3);
  
  // Split title for typing effect
  const mainTitle = "Transformemos la salud mental juvenil";
  const highlightTitle = " con tecnología empática";
  
  const { displayText: mainDisplayText } = useTypingEffect(mainTitle, 50, 500);
  const { displayText: highlightDisplayText } = useTypingEffect(
    highlightTitle, 
    50, 
    500 + (mainTitle.length * 50) + 200
  );

  return (
    <section className="hero" ref={parallaxRef}>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            {mainDisplayText}
            <span className="highlight">{highlightDisplayText}</span>
          </h1>
          <p className="hero-description">
            Únete a nuestra misión de crear soluciones tecnológicas empáticas que generen impacto real en las comunidades. Plataforma integral que combina IA predictiva para prevenir crisis y fortalecer vínculos sociales.
          </p>
          <div className="hero-actions">
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
              Iniciar colaboración
            </Button>
            <Button href="#solucion" variant="secondary" size="large">
              Conocer más
            </Button>
          </div>
        </div>
        <div className="hero-visual">
          <img 
            src={img1} 
            alt="Joven profesional usando tecnología para bienestar mental" 
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
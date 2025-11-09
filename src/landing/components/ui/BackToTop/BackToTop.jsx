import { useScroll } from '../../../hooks';
import './BackToTop.css';

const BackToTop = () => {
  const { scrollY } = useScroll();
  const isVisible = scrollY > 300;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
      aria-label="Volver al inicio"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  );
};

export default BackToTop;
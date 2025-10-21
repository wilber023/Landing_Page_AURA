import { useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ScrollIndicator from '../../ui/ScrollIndicator';
import BackToTop from '../../ui/BackToTop';
import { 
  useScrollAnimations, 
  useLazyLoading, 
  useMobileDetection 
} from '../../../hooks';
import './Layout.module.css';

const Layout = ({ children }) => {
  // Initialize global effects
  useScrollAnimations();
  useLazyLoading();
  useMobileDetection();

  // Setup accessibility features
  useEffect(() => {
    // Keyboard navigation detection
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    // Check for reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
    }

    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      document.body.classList.add('no-intersection-observer');
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div className="layout">
      <ScrollIndicator />
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
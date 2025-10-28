import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook personalizado para manejar el scroll
 * @returns {object} { scrollY, scrollProgress, isScrolled }
 */
export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      
      setScrollY(currentScrollY);
      setScrollProgress(progress);
      setIsScrolled(currentScrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once to set initial values

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, scrollProgress, isScrolled };
};

/**
 * Hook para detectar cuando un elemento está visible en viewport
 * @param {object} options - Opciones del IntersectionObserver
 * @returns {array} [ref, isVisible]
 */
export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.1,
      ...options
    });

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, options]);

  return [setRef, isVisible];
};

/**
 * Hook para animaciones de scroll con IntersectionObserver
 */
export const useScrollAnimations = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
        }
      });
    }, observerOptions);

    // Observar elementos con animaciones
    const animatedElements = document.querySelectorAll(`
      .problem-card,
      .solution-card,
      .process-step,
      .metric-card,
      .benefit-card,
      .privacy-card,
      .stat-card
    `);

    animatedElements.forEach(el => {
      if (!el.classList.contains('fade-in') && !el.classList.contains('fade-in-up')) {
        el.classList.add('fade-in');
      }
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return observerRef;
};

/**
 * Hook para smooth scrolling
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
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
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => link.addEventListener('click', handleClick));

    return () => {
      links.forEach(link => link.removeEventListener('click', handleClick));
    };
  }, []);
};

/**
 * Hook para mobile menu
 */
export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback((e) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Cerrar menú al hacer clic fuera o presionar Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.nav')) {
        closeMenu();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.body.classList.add('menu-open');
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      window.addEventListener('resize', handleResize);
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, closeMenu]);

  return { isOpen, toggleMenu, closeMenu };
};

/**
 * Hook para efectos del navbar
 */
export const useNavbarEffects = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Cambiar apariencia del nav al hacer scroll
      setIsScrolled(scrollTop > 50);

      // Ocultar nav en mobile al hacer scroll hacia abajo
      if (window.innerWidth <= 768) {
        if (scrollTop > lastScrollTop.current && scrollTop > 100) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      }
      
      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isScrolled, isHidden };
};

/**
 * Hook para typing effect
 */
export const useTypingEffect = (text, speed = 50, delay = 500) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!text) return;

    const timer = setTimeout(() => {
      setIsTyping(true);
      const typeText = () => {
        if (indexRef.current < text.length) {
          setDisplayText(text.slice(0, indexRef.current + 1));
          indexRef.current++;
          setTimeout(typeText, speed);
        } else {
          setIsTyping(false);
        }
      };
      typeText();
    }, delay);

    return () => {
      clearTimeout(timer);
      setDisplayText('');
      indexRef.current = 0;
      setIsTyping(false);
    };
  }, [text, speed, delay]);

  return { displayText, isTyping };
};

/**
 * Hook para counter animations
 */
export const useCounterAnimation = (end, start = 0, duration = 2000) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsVisible(true);
          setHasStarted(true);
        }
      },
      { threshold: 0.7 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!isVisible || hasStarted) return;

    const increment = (end - start) / (duration / 30);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isVisible, start, end, duration, hasStarted]);

  return [ref, count];
};

/**
 * Hook para form validation
 */
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback(() => {
    const newErrors = {};

    Object.keys(validationRules).forEach(field => {
      const rules = validationRules[field];
      const value = values[field];

      if (rules.required && (!value || value.trim() === '')) {
        newErrors[field] = 'Este campo es obligatorio';
      } else if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[field] = 'Por favor, ingresa un email válido';
      } else if (rules.minLength && value && value.length < rules.minLength) {
        newErrors[field] = `Mínimo ${rules.minLength} caracteres`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationRules]);

  const handleChange = useCallback((field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    
    if (validate()) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  }, [values, validate]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    validate
  };
};

/**
 * Hook para lazy loading de imágenes
 */
export const useLazyLoading = () => {
  useEffect(() => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    return () => imageObserver.disconnect();
  }, []);
};

/**
 * Hook para efectos de parallax
 */
export const useParallax = (speed = 0.3) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 768 && ref.current) {
        const scrolled = window.pageYOffset;
        const element = ref.current;
        const rate = scrolled * -speed;
        
        if (scrolled < element.offsetHeight) {
          element.style.transform = `translateY(${rate}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
};

/**
 * Hook para manejar estados de carga
 * @param {boolean} initialState - Estado inicial
 * @returns {object} { isLoading, startLoading, stopLoading }
 */
export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return { isLoading, startLoading, stopLoading };
};

/**
 * Hook para detectar dispositivos móviles
 */
export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTouch('ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || isTouch) {
      document.body.classList.add('mobile-device');
    } else {
      document.body.classList.remove('mobile-device');
    }
  }, [isMobile, isTouch]);

  return { isMobile, isTouch };
};

/**
 * Utility functions
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
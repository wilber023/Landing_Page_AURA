import { useCounterAnimation } from '../../../hooks';
import './AnimatedCounter.css';

const AnimatedCounter = ({ 
  end, 
  start = 0, 
  duration = 2000, 
  suffix = '', 
  className = '' 
}) => {
  const [ref, count] = useCounterAnimation(end, start, duration);

  const formatValue = (value) => {
    if (suffix === '%') {
      return `${value}%`;
    }
    if (typeof end === 'string' && end.includes('de')) {
      return end; // For special cases like "1 de 7"
    }
    return `${value}${suffix}`;
  };

  return (
    <span 
      ref={ref} 
      className={`animated-counter ${className}`}
    >
      {formatValue(count)}
    </span>
  );
};

export default AnimatedCounter;
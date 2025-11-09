import { useScroll } from '../../../hooks';
import './ScrollIndicator.css';

const ScrollIndicator = () => {
  const { scrollProgress } = useScroll();

  return (
    <div className="scroll-indicator">
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollIndicator;
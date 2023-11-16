import React, { useRef, useEffect, useState } from 'react';
import moe from './moe.jpg';

const useElementOnScreen = options => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = entries => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const containerRefCurrent = containerRef.current;
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRefCurrent) observer.observe(containerRefCurrent);

    return () => {
      if (containerRefCurrent) observer.unobserve(containerRefCurrent);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

export default function App() {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  return (
    <div className="app">
      <div className="isVisible">
        {isVisible ? 'IN VIEWPORT' : 'NOT IN VIEWPORT'}
      </div>
      <div className="section"></div>
      <div className="box" ref={containerRef}>
        <img src={moe} alt="moe" />
      </div>
    </div>
  );
}

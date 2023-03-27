import React, { useRef, useEffect, useState } from 'react';

export default function App() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const containerRefCurrent = containerRef.current;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callbackFunction = entries => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRefCurrent) observer.observe(containerRefCurrent);

    return () => {
      if (containerRefCurrent) observer.unobserve(containerRefCurrent);
    };
  }, [containerRef]);

  return (
    <div className="app">
      <div className="isVisible">
        {isVisible ? 'IN VIEWPORT' : 'NOT IN VIEWPORT'}
      </div>
      <div className="section"></div>
      <div className="box" ref={containerRef}>
        Observe me you filthy voyeur :S
      </div>
    </div>
  );
}

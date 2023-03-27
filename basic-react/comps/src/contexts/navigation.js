import { createContext, useState, useEffect } from 'react';

const NavigationContext = createContext({
  currentPath: '',
  navigate: () => {},
});

export function NavigationProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // This only gonna happen, when back or forward button runs (after pushState run), no when hard refresh by the user
    // pushState function does not emit this event
    const handler = e => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handler);

    return () => {
      window.removeEventListener('popstate', handler);
    };
  }, []);

  // manual (through Link: under the hood is navigate) or programmatically navigation through navigate
  const navigate = to => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
  };

  const valueToShare = {
    currentPath,
    navigate,
  };

  return (
    <NavigationContext.Provider value={valueToShare}>
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;

import { createContext, FC, ReactNode, useState } from 'react';

interface ThemeContextType {
  value: boolean;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType>({
  // default values
  value: false,
  toggleTheme: () => {},
});

interface ThemeContextProviderProps {
  children: ReactNode;
}
export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleTheme = () => {
    setDarkTheme(prevTheme => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ value: darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

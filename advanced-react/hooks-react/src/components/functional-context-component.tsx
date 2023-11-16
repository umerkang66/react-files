import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme-context';

export default function FunctionalContext() {
  const themeContext = useContext(ThemeContext);

  const themeStyle = (isDark: boolean) => {
    return {
      backgroundColor: isDark ? '#333' : '#ccc',
      color: isDark ? '#ccc' : '#333',
      padding: '2rem',
      margin: '2rem',
    };
  };

  return <div style={themeStyle(themeContext.value)}>Functional Component</div>;
}

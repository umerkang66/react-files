import { useContext } from 'react';
import ClassContextComponent from '../components/class-context-component';
import FunctionalContext from '../components/functional-context-component';
import { ThemeContext } from '../contexts/theme-context';

export default function UseContextComponent() {
  const themeCtx = useContext(ThemeContext);

  return (
    <div>
      <button onClick={themeCtx.toggleTheme}>Toggle Theme</button>
      <ClassContextComponent />
      <FunctionalContext />
    </div>
  );
}

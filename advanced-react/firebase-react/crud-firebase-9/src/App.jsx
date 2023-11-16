// contexts
import { CurrentUserProvider } from './contexts/CurrentUserContext';
// router
import AppRouter from './AppRouter';

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <AppRouter />
      </CurrentUserProvider>
    </div>
  );
}

export default App;

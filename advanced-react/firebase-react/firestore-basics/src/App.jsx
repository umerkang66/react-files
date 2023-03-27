import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// Hooks
import { useTheme } from './hooks/useTheme';
// page components
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';
import ThemeSelector from './components/ThemeSelector';
import { SWRConfig } from 'swr';

function App() {
  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <SWRConfig
        value={{
          onError: err => {
            toast.error(err?.message || 'Something went wrong');
          },
        }}
      >
        <BrowserRouter>
          <Navbar />
          <ThemeSelector />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/recipes/:id">
              <Recipe />
            </Route>
          </Switch>
        </BrowserRouter>
      </SWRConfig>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
            border: '1px solid #a1d9ff',
            boxShadow:
              'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
          },
        }}
      />
    </div>
  );
}

export default App;

import './Home.css';

// Components
import RecipeList from '../../components/RecipeList';
// Hooks
import { useRecipes } from '../../hooks/useRecipes';

function Home() {
  // you can also use the listener
  const { data, isLoading, error } = useRecipes();

  return (
    <div className="home">
      {error && <p className="error">{error?.message}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}

export default Home;

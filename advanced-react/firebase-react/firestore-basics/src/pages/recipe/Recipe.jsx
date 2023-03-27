import './Recipe.css';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useRecipe } from '../../hooks/useRecipe';
import { useUpdateRecipe } from '../../hooks/useUpdateRecipe';

function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();
  const { data: recipe, error, isLoading } = useRecipe(id);
  const {
    error: updateError,
    isLoading: updateLoading,
    updateRecipe,
  } = useUpdateRecipe();

  const handleClick = () => {
    updateRecipe({ id, data: { title: 'Something completely different' } });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error?.message}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => (
              <li key={ing}>ing</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button disabled={updateLoading} onClick={handleClick}>
            {updateLoading ? 'Updating...' : 'Update me'}
          </button>
        </>
      )}
      {updateError && updateError?.message}
    </div>
  );
}

export default Recipe;

import './RecipeList.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useTheme } from '../hooks/useTheme';
import Trashcan from '../assets/trashcan.svg';
import { useDeleteRecipe } from '../hooks/useDeleteRecipe';

function RecipeList({ recipes }) {
  const { mode } = useTheme();
  const { deleteRecipe, error } = useDeleteRecipe();

  const handleClick = id => {
    const promise = deleteRecipe(id);

    toast.promise(promise, {
      loading: 'Deleting the recipe',
      success: 'Successfully deleted the recipe',
      error: 'Error while deleting',
    });
  };

  return (
    <div className="recipe-list">
      {!recipes.length && (
        <div style={{ color: 'white' }}>No Recipes Found</div>
      )}
      {recipes.map(recipe => (
        <div
          key={recipe.id}
          className={`card ${mode} ${recipe.new ? 'new' : ''}`}
        >
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>

          <img
            className="delete"
            onClick={() => handleClick(recipe.id)}
            src={Trashcan}
            alt="delete icon"
          />
        </div>
      ))}
      {error && error?.message}
    </div>
  );
}

export default RecipeList;

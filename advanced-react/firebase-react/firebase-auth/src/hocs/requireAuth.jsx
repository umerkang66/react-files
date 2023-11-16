import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const requireAuth = Component => {
  const ComposedComponent = props => {
    const { user, authIsReady } = useAuthContext();

    const UnAuthJsx = (
      <div className="unauthorized">
        <div>
          <h3>You are not logged in to access this content</h3>
          <Link to="/login">Login</Link>
        </div>
      </div>
    );

    if (!authIsReady) {
      return null;
    }
    if (!user) {
      return UnAuthJsx;
    }

    return <Component {...props} />;
  };

  return ComposedComponent;
};

export { requireAuth };

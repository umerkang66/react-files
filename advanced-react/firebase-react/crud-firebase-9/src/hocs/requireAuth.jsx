import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../hooks/useCurrentUserContext';

const requireAuth = Component => {
  const ComposedComponent = props => {
    const { isAuthReady, user } = useCurrentUserContext();

    const UnAuthJsx = (
      <div className="unauthorized">
        <div>
          <h3>You are not logged in to access this content</h3>
          <Link to="/login">Login</Link>
        </div>
      </div>
    );

    if (!isAuthReady) {
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

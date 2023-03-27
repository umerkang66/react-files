import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../hooks/useCurrentUserContext';

const noRequireAuth = Component => {
  const ComposedComponent = props => {
    const { isAuthReady, user } = useCurrentUserContext();

    const AuthJsx = (
      <div className="unauthorized">
        <div>
          <h3>You are already logged in</h3>
          <Link to="/">Home</Link>
        </div>
      </div>
    );

    if (!isAuthReady) {
      return null;
    }
    if (user) {
      return AuthJsx;
    }

    return <Component {...props} />;
  };

  return ComposedComponent;
};

export { noRequireAuth };

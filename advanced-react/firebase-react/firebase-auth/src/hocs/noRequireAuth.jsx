import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const noRequireAuth = Component => {
  const ComposedComponent = props => {
    const { user, authIsReady } = useAuthContext();

    const AuthJsx = (
      <div className="unauthorized">
        <div>
          <h3>You are already logged in</h3>
          <Link to="/">Home</Link>
        </div>
      </div>
    );

    if (!authIsReady) {
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

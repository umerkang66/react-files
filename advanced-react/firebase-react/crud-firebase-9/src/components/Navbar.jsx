import React from 'react';
import { Link } from 'react-router-dom';
import { useSignout } from '../hooks/useSignout';
import { useCurrentUserContext } from '../hooks/useCurrentUserContext';

function Navbar() {
  const { signout, loading } = useSignout();
  const { isAuthReady, user } = useCurrentUserContext();

  return (
    <nav>
      <Link to="/">
        <h1>My Reading List</h1>
      </Link>
      {isAuthReady && (
        <ul>
          {user ? (
            <li>
              <button onClick={signout} disabled={loading}>
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;

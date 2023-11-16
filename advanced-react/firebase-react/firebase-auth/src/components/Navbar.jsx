import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useSignout } from '../hooks/useSignout';

function Navbar() {
  const { user, authIsReady } = useAuthContext();
  const signoutHook = useSignout();

  let content;
  if (!authIsReady) {
    content = (
      <li>
        <p>Loading...</p>
      </li>
    );
  } else if (authIsReady && user) {
    content = (
      <>
        <li>hello, {user.displayName}</li>
        <li>
          <button
            className="btn"
            disabled={signoutHook.isPending}
            onClick={signoutHook.signout}
          >
            Logout
          </button>
        </li>
      </>
    );
  } else {
    content = (
      <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </>
    );
  }

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to="/">myMoneyApp</Link>
        </li>
        {content}
      </ul>
    </nav>
  );
}

export default Navbar;

import styles from './Signup.module.css';
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { noRequireAuth } from '../../hocs/noRequireAuth';

function Signup() {
  const [data, setData] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const { signup, error, isPending } = useSignup();

  const handleSubmit = e => {
    e.preventDefault();
    signup(data);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>sign up</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={({ target: { value: email } }) =>
            setData(prev => ({ ...prev, email }))
          }
          value={data.email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={({ target: { value: password } }) =>
            setData(prev => ({ ...prev, password }))
          }
          value={data.password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          type="text"
          onChange={({ target: { value: displayName } }) =>
            setData(prev => ({ ...prev, displayName }))
          }
          value={data.displayName}
        />
      </label>
      {!isPending && <button className="btn">sign up</button>}
      {isPending && (
        <button className="btn" disabled>
          loading
        </button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default noRequireAuth(Signup);

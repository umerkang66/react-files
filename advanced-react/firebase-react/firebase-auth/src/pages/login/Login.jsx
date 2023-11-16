import styles from './Login.module.css';
import { useState } from 'react';
import { useSignin } from '../../hooks/useSignin';
import { noRequireAuth } from '../../hocs/noRequireAuth';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const { signin, error, isPending } = useSignin();

  const handleSubmit = e => {
    e.preventDefault();
    signin(data);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>login</h2>
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
      {!isPending && <button className="btn">Login</button>}
      {isPending && (
        <button className="btn" disabled>
          loading
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}

export default noRequireAuth(Login);

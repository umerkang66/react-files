import { useState } from 'react';
import { useSignin } from '../hooks/useSignin';
import { noRequireAuth } from '../hocs/noRequireAuth';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const { signin, loading, error } = useSignin();

  const handleSubmit = e => {
    e.preventDefault();
    signin(data);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>email:</span>
          <input
            required
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
            required
            type="password"
            onChange={({ target: { value: password } }) =>
              setData(prev => ({ ...prev, password }))
            }
            value={data.password}
          />
        </label>
        <button disabled={loading}>
          {loading ? 'Logging In...' : 'Log in'}
        </button>
      </form>
      {error && error}
    </div>
  );
}

export default noRequireAuth(Login);

import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { noRequireAuth } from '../hocs/noRequireAuth';

function Signup() {
  const [data, setData] = useState({ email: '', password: '' });
  const { signup, loading, error } = useSignup();

  const handleSubmit = e => {
    e.preventDefault();
    signup(data);
  };

  return (
    <div>
      <h2>Signup</h2>
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
          {loading ? 'Signing Up...' : 'Sign up'}
        </button>
      </form>
      {error && error}
    </div>
  );
}

export default noRequireAuth(Signup);

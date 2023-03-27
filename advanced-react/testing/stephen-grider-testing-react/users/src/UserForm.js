import { useState } from 'react';

function UserForm({ onUserAdd }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    onUserAdd({ name, email });

    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          id="name"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          id="email"
          type="text"
        />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;

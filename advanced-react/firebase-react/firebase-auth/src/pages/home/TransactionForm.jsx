import { useState } from 'react';
import { useFirestoreMutation } from '../../hooks/useFirestoreMutation';

const defaultState = { name: '', amount: '' };

function TransactionForm({ uid }) {
  const [data, setData] = useState(defaultState);
  const { addDocument, response } = useFirestoreMutation('transactions');

  const handleSubmit = e => {
    e.preventDefault();
    addDocument({ ...data, uid }).then(() => setData(defaultState));
  };

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={({ target: { value: name } }) =>
              setData(prev => ({ ...prev, name }))
            }
            value={data.name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={({ target: { value: amount } }) =>
              setData(prev => ({ ...prev, amount }))
            }
            value={data.amount}
          />
        </label>
        <button disabled={response.isPending}>
          {response.isPending ? 'Adding' : 'Add Transaction'}
        </button>
      </form>
    </>
  );
}

export default TransactionForm;

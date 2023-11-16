import styles from './Home.module.css';
import { useFirestoreMutation } from '../../hooks/useFirestoreMutation';

function TransactionItem({ transaction }) {
  const { deleteDocument, response } = useFirestoreMutation('transactions');

  return (
    <li key={transaction.id}>
      <p className={styles.name}>{transaction.name}</p>
      <p className={styles.amount}>${transaction.amount}</p>
      <button
        disabled={response.isPending}
        onClick={() => deleteDocument(transaction.id)}
      >
        {response.isPending ? '..' : 'x'}
      </button>
    </li>
  );
}

export default TransactionItem;

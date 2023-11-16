import styles from './Home.module.css';
import { useFirestoreCollection } from '../../hooks/useFirestoreQuery';
import TransactionItem from './TransactionItem';

function TransactionList({ uid }) {
  // these both things, will create an index in the firebase
  const query = ['uid', '==', uid];
  const orderBy = ['createdAt', 'desc'];

  const {
    documents: transactions,
    error,
    isPending,
  } = useFirestoreCollection('transactions', query, orderBy);

  let content;
  if (isPending) {
    content = <h3>Loading...</h3>;
  } else {
    content = (
      <ul className={styles.transactions}>
        {error && <p>{error}</p>}

        {transactions.map(transaction => (
          <TransactionItem transaction={transaction} key={transaction.id} />
        ))}
      </ul>
    );
  }

  return content;
}

export default TransactionList;

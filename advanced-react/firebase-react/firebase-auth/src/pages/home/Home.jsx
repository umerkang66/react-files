import styles from './Home.module.css';

import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { requireAuth } from '../../hocs/requireAuth';
import { useAuthContext } from '../../hooks/useAuthContext';

function Home() {
  const { user } = useAuthContext();

  return (
    <div className={styles.container}>
      <div className={styles.content}>{<TransactionList uid={user.uid} />}</div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}

export default requireAuth(Home);

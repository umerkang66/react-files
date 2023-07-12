import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header';
import Loader from './Loader';
import CartOverview from '../features/cart/CartOverview';

function AppLayout() {
  // global navigation (loading) state.
  const { state } = useNavigation();
  const isLoading = state === 'loading';

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;

import { Route, Routes, Navigate } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import MainHeader from './components/MainHeader';

export default function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/welcome" />} />

          <Route path="/welcome/*" element={<Welcome />}>
            {/* There will be nested routes inside this component */}
            <Route path="new-user" element={<p>Welcome, new user!</p>} />
          </Route>

          {/* Children elements to Route are possible nested routes */}
          <Route path="/products" element={<Products />} />

          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  );
}

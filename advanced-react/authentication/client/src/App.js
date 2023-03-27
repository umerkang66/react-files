import Header from 'components/Header';
import { Routes, Route } from 'react-router-dom';

import Welcome from './components/Welcome';
import Signup from 'components/auth/Signup';
import Signin from 'components/auth/Signin';
import Signout from 'components/auth/Signout';
import Feature from 'components/Feature';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="/feature" element={<Feature />} />
      </Routes>
    </div>
  );
};

export default App;

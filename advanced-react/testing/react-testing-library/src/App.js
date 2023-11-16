import './App.css';
import Banner from './components/Banner/Banner';
import { Switch, Route } from 'react-router-dom';
import TodoPage from './pages/TodoPage/TodoPage';
import FollowersPage from './pages/FollowersPage/FollowersPage';

export default function App() {
  return (
    <div className="App">
      <Banner />
      <Switch>
        <Route strict exact path="/" component={TodoPage} />
        <Route strict exact path="/followers" component={FollowersPage} />
      </Switch>
    </div>
  );
}

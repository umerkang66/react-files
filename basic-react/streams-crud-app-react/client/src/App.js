import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history.js';

// COMPONENTS // STREAMS
import StreamCreate from './components/streams/StreamCreate.js';
import StreamDelete from './components/streams/StreamDelete.js';
import StreamEdit from './components/streams/StreamEdit.js';
import StreamList from './components/streams/StreamList.js';
import StreamShow from './components/streams/StreamShow.js';
// COMPONENTS
import Header from './components/Header.js';

const App = () => {
  return (
    <div className="app ui container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete/:id" exact component={StreamDelete} />
          <Route path="/streams/:id" exact component={StreamShow} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

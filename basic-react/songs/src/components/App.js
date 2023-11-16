import React from 'react';
import SongList from './SongList.js';
import SongDetail from './SongDetail.js';

const App = () => {
  return (
    <div style={{ marginTop: '50px' }} className="ui container grid">
      <div className="ui row">
        <div className="column eight wide">
          <SongList />
          <SongDetail />
        </div>
      </div>
    </div>
  );
};

export default App;

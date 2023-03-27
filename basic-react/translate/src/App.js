import React, { Component } from 'react';
import UserCreate from './components/UserCreate.js';
import { LanguageStore } from './contexts/LanguageContext.js';
import ColorContext from './contexts/ColorContext.js';
import LanguageSelector from './components/LanguageSelector.js';

class App extends Component {
  render() {
    return (
      <div style={{ height: '100vh', backgroundColor: '#f1f1f1' }}>
        <div className="ui container app">
          <LanguageStore>
            <LanguageSelector />
            <ColorContext.Provider value="green">
              <UserCreate />
            </ColorContext.Provider>
          </LanguageStore>
        </div>
      </div>
    );
  }
}

export default App;

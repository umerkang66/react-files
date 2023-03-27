import { Component } from 'react';
import UserCreate from './components/user-create';
import { LanguageStore } from './context/language-context';
import LanguageSelector from './components/language-selector';
import ColorContext from './context/color-context';

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <LanguageStore>
          <LanguageSelector />
          <div>
            <ColorContext.Provider value="red">
              <UserCreate />
            </ColorContext.Provider>
          </div>
        </LanguageStore>
      </div>
    );
  }
}

export default App;

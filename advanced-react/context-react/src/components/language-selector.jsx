import { Component } from 'react';
import LanguageContext from '../context/language-context';

class LanguageSelector extends Component {
  static contextType = LanguageContext;

  render() {
    return (
      <div>
        <h2>Select a language:</h2>
        <i
          className="flag us"
          onClick={() => this.context.onLanguageChange('english')}
        />
        <i
          className="flag pk"
          onClick={() => this.context.onLanguageChange('urdu')}
        />
      </div>
    );
  }
}

export default LanguageSelector;

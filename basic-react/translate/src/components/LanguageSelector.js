import React, { Component } from 'react';
import LanguageContext from '../contexts/LanguageContext.js';

class LanguageSelector extends Component {
  static contextType = LanguageContext;

  render() {
    return (
      <div>
        <h1> Select a Language:</h1>
        <i
          style={{ cursor: 'pointer' }}
          className="flag us"
          onClick={() => this.context.onLanguageChange('english')}
        />
        <i
          style={{ cursor: 'pointer' }}
          className="flag nl"
          onClick={() => this.context.onLanguageChange('dutch')}
        />
      </div>
    );
  }
}

export default LanguageSelector;

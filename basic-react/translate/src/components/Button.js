import React, { Component } from 'react';
import LanguageContext from '../contexts/LanguageContext.js';
import ColorContext from '../contexts/ColorContext.js';

// static keyword applies the properties on the constructor function or the class itself not on the instances of the classes
class Button extends Component {
  renderSubmit(language) {
    return language === 'english' ? 'Submit' : 'Voorleggen';
  }

  renderButton(color) {
    return (
      <button className={`ui ${color} button`}>
        <LanguageContext.Consumer>
          {({ language }) => this.renderSubmit(language)}
        </LanguageContext.Consumer>
      </button>
    );
  }

  render() {
    return (
      <ColorContext.Consumer>
        {color => this.renderButton(color)}
      </ColorContext.Consumer>
    );
  }
}

export default Button;

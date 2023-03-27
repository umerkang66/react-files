import { Component } from 'react';
import LanguageContext from '../context/language-context';

class Field extends Component {
  static contextType = LanguageContext;

  render() {
    const name = this.context.language === 'english' ? 'Name' : 'نام';

    return (
      <div className="ui field">
        <label htmlFor="name">{name}</label>
        <input type="text" id="name" />
      </div>
    );
  }
}

export default Field;

import { Component, createContext } from 'react';

const Context = createContext({
  // this is default state of context (default values)
  language: 'english',
  onLanguageChange: language => {},
});

export class LanguageStore extends Component {
  state = { language: 'english' };

  onLanguageChange = language => {
    this.setState({ language });
  };

  render() {
    return (
      <Context.Provider
        value={{ ...this.state, onLanguageChange: this.onLanguageChange }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;

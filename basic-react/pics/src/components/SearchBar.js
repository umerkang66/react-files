import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };

  // Fixing issues
  // 1) Using arrow function because there is not this keyword in arrow function
  // 2) The second fix is to use the bind method and bind the this keyword
  // 3) The third way is use the callback function in the form(div) element i.e. should be Arrow function
  onFormSubmit = e => {
    e.preventDefault();
    const searchQuery = this.state.term;
    this.props.onSubmit(searchQuery);
  };

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} id="form" className="ui form">
          <div className="field">
            <label htmlFor="input">
              <h1>Search:</h1>
            </label>
            <input
              className="form__input"
              type="text"
              value={this.state.term}
              // onChange also expects a callback function so that we use the arrow function, the event handlers always expects a callBack
              onChange={e => this.setState({ term: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;

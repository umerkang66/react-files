import React, { Component } from 'react';

class SearchBar extends Component {
  state = { term: '' };

  constructor(props) {
    super(props);
  }

  onInputChange = e => {
    this.setState({ term: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    // Make sure we call callback from parent component
    if (!this.state.term) return;
    this.props.onFormSubmit(this.state.term);
  };

  render() {
    return (
      <div className="search-bar-top-top ui segment">
        <form className="ui  form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label htmlFor="form__input">Video Search</label>
            <input
              type="text"
              name="form__input"
              id="form__input"
              className="form__input"
              onChange={this.onInputChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;

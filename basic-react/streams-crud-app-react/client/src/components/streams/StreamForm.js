import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// Field is a react component and reduxForm is a function

class StreamForm extends Component {
  renderError({ error, touched }) {
    if (!touched) return null;
    if (!error) return null;

    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }

  renderInput = ({ input, label, meta, placeholder }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label htmlFor="text-input">{label}</label>
        <input
          type="text"
          {...input}
          id="text-input"
          placeholder={placeholder}
          autoComplete="off"
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formProps => {
    this.props.onSubmit(formProps);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Title"
          placeholder="Enter Title"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
          placeholder="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) errors.title = 'You must enter a title';

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({ form: 'streamForm', validate })(StreamForm);

import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from 'react-router-dom';

import * as actions from 'actions';

const Signin = ({ handleSubmit, signin, errorMessage }) => {
  const navigate = useNavigate();

  const onSubmit = authProps => {
    // We can change the url or redirect the page by passing the callback in the signup action-creator because changing the url or redirecting is only allowed in react components
    // This callback will only run when the authentication will be successful
    signin(authProps, () => {
      // Navigate to the homepage
      navigate('/');
    });
  };

  return (
    // We need to call handleSubmit provided by redux form and pass our callback
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label>Email</label>
        <Field name="email" type="text" component="input" autoComplete="none" />
      </fieldset>
      <fieldset>
        <label>Password</label>
        <Field
          name="password"
          type="password"
          component="input"
          autoComplete="none"
        />
      </fieldset>
      <button>Sign In!</button>
      {errorMessage && (
        <div
          style={{
            backgroundColor: 'orangered',
            color: 'white',
            padding: '10px 30px',
          }}
        >
          {errorMessage}
        </div>
      )}
    </form>
  );
};

const mapStateToProps = ({ auth }) => ({
  errorMessage: auth.errorMessage,
});

// Compose: It allows to write multiple higher order components with a much better syntax, write the component in the second parenthesis of compose function, and list all the other higher order components in the first parenthesis of compose function, call the higher order functions with the appropriate arguments
// Higher order components will be called from right to left (below to above) as expected

// We have to provide options object with name of the form
const formOptions = { form: 'signin' };

export default compose(
  connect(mapStateToProps, actions),
  reduxForm(formOptions)
)(Signin);

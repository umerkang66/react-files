import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

// CLIENT ID
const CLIENT_ID =
  '888362575437-6k6shsib2c70c1di07s71qpo594eql0f.apps.googleusercontent.com';

class GoogleAuth extends Component {
  auth;

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: CLIENT_ID,
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        })
        .catch(err => {
          console.log(err.toString());
          console.log(err.message);
          console.log(err);
        });
    });
  }

  // WE HAVE TO USE ARROW FUNCTION IN ORDER TO PREVENT THE THIS KEYWORD ERROR
  onAuthChange = isSignedIn => {
    if (isSignedIn) this.props.signIn(this.auth.currentUser.get().getId());
    else this.props.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign out
        </button>
      );
    } else if (!this.props.isSignedIn) {
      return (
        <button className="ui blue google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign in
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStatetoProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStatetoProps, { signIn, signOut })(GoogleAuth);

import React from 'react';
import ReactDOM from 'react-dom';

import SeasonDisplay from './SeasonDisplay.js';
import Spinner from './Spinner.js';

class App extends React.Component {
  state = { lat: null, errorMessage: '' };

  // Mount method will always be called first
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>ERROR: {this.state.errorMessage}</div>;
    }

    if (this.state.lat && !this.state.errorMessage) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please accept location request" />;
  }

  // That is a requirement of every class based component
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

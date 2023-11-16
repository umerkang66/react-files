import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm.js';

class StreamEdit extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchStream(id);
  }

  onSubmit = formValues => {
    const id = this.props.stream.id;
    this.props.editStream(id, formValues);
  };

  render() {
    if (!this.props.stream) return <div>Loading...</div>;

    return (
      <div>
        <h2>Edit a stream</h2>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.stream, 'title', 'description')}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return { stream: state.streams[id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);

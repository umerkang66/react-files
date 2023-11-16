import React, { useEffect } from 'react';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import Modal from '../Modal.js';
import history from '../../history.js';

const StreamDelete = props => {
  const cancelHandler = () => {
    history.push('/');
  };

  const id = props.match.params.id;
  const { fetchStream } = props;

  useEffect(() => {
    fetchStream(id);
  }, [id, fetchStream]);

  const deleteStreamHandler = () => {
    props.deleteStream(id);
  };

  const actions = (
    <React.Fragment>
      <button onClick={cancelHandler} className="ui button cancel">
        Cancel
      </button>
      <button onClick={deleteStreamHandler} className="ui red button">
        Delete
      </button>
    </React.Fragment>
  );

  const renderTitle = () => {
    if (!props.stream) return 'Delete Stream';
    return `Delete Stream (${props.stream.title})`;
  };

  const renderContent = () => {
    if (!props.stream) return 'Are you sure you want to delete this stream?';

    return `Are you sure you want to delete the (${props.stream.title}) stream?`;
  };

  return (
    <Modal
      title={renderTitle()}
      content={renderContent()}
      actions={actions}
      onDismiss={cancelHandler}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return { stream: state.streams[id] };
};

export default connect(mapStateToProps, {
  fetchStream,
  deleteStream,
})(StreamDelete);

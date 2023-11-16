import { useEffect } from 'react';
import * as actions from 'actions';
import { connect } from 'react-redux';

const Signout = ({ signout }) => {
  useEffect(() => {
    signout();
  }, [signout]);

  return <div>Sorry to see you go</div>;
};

export default connect(null, actions)(Signout);

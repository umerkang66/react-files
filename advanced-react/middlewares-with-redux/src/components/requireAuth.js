import { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const requireAuth = ChildComponent => {
  class ComposedComponent extends Component {
    render() {
      return <ChildComponent />;
    }
  }

  return ComposedComponent;
};

const requireAuthF = ChildComponent => {
  const ComposedComponent = ({ auth, ...otherProps }) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Auth functions
      const shouldNavigateAway = () => {
        if (!auth) {
          navigate('/');
        }
      };

      shouldNavigateAway();
    });

    return <ChildComponent {...otherProps} />;
  };

  const mapStateToProps = state => ({
    auth: state.auth,
  });

  return connect(mapStateToProps)(ComposedComponent);
};

export default requireAuthF;

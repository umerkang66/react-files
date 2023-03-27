import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const requireAuth = ChildComponent => {
  const ComposedComponent = ({ token, ...otherProps }) => {
    const navigate = useNavigate();

    useEffect(() => {
      const shouldNavigateAway = () => {
        if (!token) {
          navigate('/');
        }
      };

      shouldNavigateAway();
    });

    return <ChildComponent {...otherProps} />;
  };

  const mapStateToProps = state => ({
    token: state.auth.authenticated,
  });

  return connect(mapStateToProps)(ComposedComponent);
};

export default requireAuth;

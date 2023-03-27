import { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const requireAuthClass = ChildComponent => {
  class ComposedComponent extends Component {
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return ComposedComponent;
};

const requireAuth = ChildComponent => {
  // First we have to create an another component, this component will have props from mapStateToProps function that is below this component where the component is being returned, but some other props may also come like the props from react-router component passed into our Composed component, but originally these props are for original component (not for our higher order component) so have to collect these props using rest operator (...) and then pass them into our original component through spread operator (...)
  // In the CommentBox component, we are wiring the requireAuth after the connect HOC has been wired, so the the props from connect function of Comment Box (that may be actions, and state required for CommentBox) should not be shown in the ComposedComponent but we still are collecting other props using rest operator, because some other props may come from Upper Component in the component hierarchy, they also come from react-router component
  // But in the CommentBox component, if we wired the requireAuth before connect HOC has been wired, props from connect function (like actions, or state) will show up in the ComposedComponent (HOC) that we also have to pass to our original component
  // In other words, always use ...otherProps to collect the props, and pass them to the original component using spread operator
  const ComposedComponent = ({ auth, ...otherProps }) => {
    // We can add additional logic that will occur to every Child component that will be passed into our higher order component
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

    // Make sure to return our original component from Composed component
    return <ChildComponent {...otherProps} />;
  };

  const mapStateToProps = state => ({
    auth: state.auth,
  });

  // Make sure to connect the state related to the HOC here in this higher-order-component
  return connect(mapStateToProps)(ComposedComponent);
};

export default requireAuth;

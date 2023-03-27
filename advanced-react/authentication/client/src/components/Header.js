import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ auth }) => {
  const renderLinks = () => {
    if (auth) {
      return (
        <div>
          <Link to="/signout">Sign Out</Link>
          <Link to="/feature">Feature</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      );
    }
  };

  return (
    <div>
      <Link to="/">Redux Auth</Link>
      {renderLinks()}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth.authenticated,
});

export default connect(mapStateToProps)(Header);

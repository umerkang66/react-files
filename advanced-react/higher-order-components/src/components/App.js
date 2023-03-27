import { Route, Routes, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from 'actions';

import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

const App = ({ auth, changeAuth }) => {
  const renderButton = () => {
    if (auth) {
      return <button onClick={() => changeAuth(false)}>Sign Out</button>;
    } else {
      return <button onClick={() => changeAuth(true)}>Sign In</button>;
    }
  };

  const renderHeader = () => {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Post a comment</Link>
        </li>
        <li>{renderButton()}</li>
      </ul>
    );
  };

  return (
    <div>
      {renderHeader()}
      {/* In react router 6, "Routes" is a replacement of switch */}
      <Routes>
        {/* We need to add element instead of component and the value should be provided by as a dynamic value (the way we write react components) */}
        <Route path="/" element={<CommentList />} />
        <Route path="/posts" element={<CommentBox />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, actions)(App);

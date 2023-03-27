import { connect } from 'react-redux';

const CommentList = ({ comments }) => {
  const commentsDiv = comments.map((comment, i) => <li key={i}>{comment}</li>);

  return (
    <div>
      <ul>{commentsDiv}</ul>
    </div>
  );
};

const mapStateToProps = state => {
  return { comments: state.comments };
};

export default connect(mapStateToProps)(CommentList);

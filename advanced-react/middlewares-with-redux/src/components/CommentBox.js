import { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';
import requireAuthF from './requireAuth';

const CommentBox = ({ saveComment, fetchComments }) => {
  const [comment, setComment] = useState('');

  const handleFormChange = event => {
    setComment(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    saveComment(comment);
    // Clear the textarea
    setComment('');
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <h4>Add a comment</h4>
        <textarea
          name="textarea"
          id="textarea"
          cols="30"
          rows="10"
          value={comment}
          onChange={handleFormChange}
        ></textarea>
        <button>Submit Comment</button>
      </form>
      {/* We need to add "className" because it will be easy to find this button from our testing environment */}
      <button className="fetch-comments" onClick={fetchComments}>
        Fetch Comment
      </button>
    </div>
  );
};

export default requireAuthF(connect(null, actions)(CommentBox));

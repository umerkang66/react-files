import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/App';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

// We have to initialized this outside of any function or callback, so that it could get to the other "it" function through the scoping process
let wrapped;
// Any login in this callback will be run before the every "it" function
beforeEach(() => {
  // Shallow function will not render react children components, but it will render html children components, and will not render nested components
  wrapped = shallow(<App />);
});

it('shows a comment box', () => {
  // Find method on wrapped will return array
  expect(wrapped.find(CommentBox).length).toEqual(1);
});

it('shows a comment list', () => {
  // Explanation of this stuff in upper test
  expect(wrapped.find(CommentList).length).toEqual(1);
});

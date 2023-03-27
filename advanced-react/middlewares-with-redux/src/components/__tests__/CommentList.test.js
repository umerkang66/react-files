import { mount } from 'enzyme';
import Root from 'Root';

import CommentList from 'components/CommentList';

let wrapped;

beforeEach(() => {
  const initialState = {
    comments: ['Comment 1', 'Comment 2'],
  };

  // We have to provide with initial state soo that we can test with it, so as initial state we are passing 2 comments
  wrapped = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

it('creates one LI per comment', () => {
  // CommentList component renders as much "li" html elements as the number of comments are in the comment state
  expect(wrapped.find('li').length).toEqual(2);
});

it('shows the text for each comment', () => {
  // Check if ComponentList component contains both "Comment 1" and "Comment 2"
  expect(wrapped.render().text()).toContain('Comment 1');
  expect(wrapped.render().text()).toContain('Comment 2');
});

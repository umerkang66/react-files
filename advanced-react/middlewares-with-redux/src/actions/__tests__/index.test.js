import { saveComment } from 'actions';
import { SAVE_COMMENTS } from 'actions/types';

// We need to use describe because for every action-creator we need to write two tests, one for checking the action type, and another for checking the correct payload
describe('saveComment', () => {
  it('has the correct type', () => {
    // We can call the action-creator without the argument (comment) because here we only care about the "type"
    const action = saveComment();
    expect(action.type).toEqual(SAVE_COMMENTS);
  });

  it('has the correct payload', () => {
    const fakeComment = 'fake comment';
    const action = saveComment(fakeComment);
    expect(action.payload).toEqual(fakeComment);
  });
});

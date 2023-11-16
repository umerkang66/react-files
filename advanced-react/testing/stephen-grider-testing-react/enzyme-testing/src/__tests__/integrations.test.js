// To test for AUTHENTICATION, just add fake current user, in the moxios request, or initial state
import { mount } from 'enzyme';
import Root from 'Root';
import moxios from 'moxios';
import App from 'components/App';

beforeEach(() => {
  // Turn off any request issued by axios
  moxios.install();

  const url = 'https://jsonplaceholder.typicode.com/comments';

  // If moxios sees request don't make the original request instead respond the with fake data that will be provided below
  moxios.stubRequest(url, {
    // Sending back fake request to axios
    status: 200,
    // Fake data: it has only name property because that's the one that we needed
    response: [{ name: 'Fetched #1' }, { name: 'Fetched #2' }],
  });
});

// We have to do some cleanup after every test
afterEach(() => {
  moxios.uninstall();
});

it('can fetch a list of comments and display them', done => {
  // Attempt to render the *entire* app
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );

  // Find the 'fetchComments' button and click it
  wrapped.find('.fetch-comments').simulate('click');

  // Introduce a TINY little pause
  // Expect to find a list of comments
  // eslint-disable-next-line testing-library/await-async-utils
  moxios.wait(() => {
    // We also have to update after a PAUSE so that the data arrives from moxios
    wrapped.update();
    expect(wrapped.find('li').length).toEqual(2);

    // calling moxios.wait is not enough we also have to tell the jest to WAIT for some moments. We have to call the "done" that is provided by jest, if we didn't call done, jest is going to assume that test is not completed
    done();
    // Remove the component from fake dom (computer memory)
    wrapped.unmount();
  });
});

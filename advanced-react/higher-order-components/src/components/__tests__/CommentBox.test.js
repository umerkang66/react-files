import React from 'react';
import { mount } from 'enzyme';

import Root from 'Root';
import CommentBox from 'components/CommentBox';

let wrapped;

beforeEach(() => {
  // Mount is a full-dom checking function from enzyme, it will also check for the nested children
  wrapped = mount(
    // By using root, we are providing the redux state through redux store, by using Provider component provided by react-redux library
    <Root>
      <CommentBox />
    </Root>
  );
});

// This runs after every it function runs
afterEach(() => {
  wrapped.unmount();
});

it('has a text area and two buttons', () => {
  // Explanation of these two lines is in App.test.js file
  expect(wrapped.find('textarea').length).toEqual(1);
  // There are two buttons now in the dom
  expect(wrapped.find('button').length).toEqual(2);
});

// We can add "describe" block to group together some tests, and limit the scope of beforeEach
describe('the text area', () => {
  const fakeComment = 'fake comment';

  // This before will run before the test that are in the scope of Describe function
  beforeEach(() => {
    // We are not adding this "changeEvent" login in the global beforeEach because it can affect the upper test ("it" statement)

    // Second Argument (Callback): By using this object, we are going to trick the event handler, in the event handlers event value comes from: event.target.value --> Here we are adding "fake comment" as "value" property to the "target", and at the end this whole object in the second argument of simulate becomes as if it is the value for "event" object that is passed in the handleFormChange, and handleFormSubmit functions
    const event = { target: { value: fakeComment } };

    // Here we are simulating the change event, triggered by typing in the textarea (notice: it is change not onChange)
    wrapped.find('textarea').simulate('change', event);

    // Forcing the component to update
    wrapped.update();
  });

  it('has a text area that users can type in', () => {
    // In the expect function, we again find "textarea" from our component, and call the prop method that is provided by enzyme to the component with the "value" because we need the value prop from textarea in our CommentBox component, and compare the value with "fakeComment" that we provided as a fake Event
    expect(wrapped.find('textarea').prop('value')).toEqual(fakeComment);
  });

  it('when form is submitted, textarea gets emptied', () => {
    // Here we can check by adding another expect function, if change event actually fired, but we are not doing it because we have done it in the upper test

    // Find the form element from component (wrapped) then call the submit event (event is submit not "onSubmit")
    wrapped.find('form').simulate('submit');
    // Submit event change the state, so we need to update the component
    wrapped.update();

    // When user submit the form the "value" prop of textarea should be empty string
    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
});

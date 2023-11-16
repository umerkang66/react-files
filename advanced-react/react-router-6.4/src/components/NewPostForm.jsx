import { Form } from 'react-router-dom';
import classes from './NewPostForm.module.css';

export default function NewPostForm({ onCancel, submitting }) {
  // by using action, this will not sent to any backend, instead it will send to the action function defined by us in "/blog/new"

  return (
    <Form className={classes.form} method="post" action="/blog/new">
      <fieldset>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required minLength={5} />
      </fieldset>
      <fieldset>
        <label htmlFor="text">Post Text</label>
        <textarea
          id="text"
          name="post-text"
          required
          minLength={10}
          rows={5}
        ></textarea>
      </fieldset>
      <button disabled={submitting} type="button" onClick={onCancel}>
        Cancel
      </button>
      <button disabled={submitting}>
        {submitting ? 'Submitting...' : 'Create Post'}
      </button>
    </Form>
  );
}

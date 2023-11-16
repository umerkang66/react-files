import {
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';

import NewPostForm from '../components/NewPostForm';
import { savePost } from '../util/api';

export default function NewPostPage() {
  const navigate = useNavigate();
  const error = useActionData();
  const navigation = useNavigation();

  function cancelHandler() {
    navigate('/blog');
  }

  return (
    <div>
      <NewPostForm
        onCancel={cancelHandler}
        submitting={navigation.state === 'submitting'}
      />
      {error && (
        <div id="error-content">{error.status + ': ' + error.message}</div>
      )}
    </div>
  );
}

// request from react-router-dom will be sent to this action
export async function action({ request }) {
  // this "request" obj is still in the browser, it also gets "params" obj

  const formData = await request.formData();
  const post = {
    title: formData.get('title'),
    body: formData.get('post-text'),
  };

  try {
    await savePost(post);
  } catch (err) {
    // by default the closest ErrorElement will be rendered with error message
    if (err.status === 422) {
      // if we returned the error, instead of throwing it, we can access the error from the same page
      return err;
    }

    return err;
  }

  return redirect('/blog');
}

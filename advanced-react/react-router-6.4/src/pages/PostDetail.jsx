import { useLoaderData } from 'react-router-dom';
import BlogPost from '../components/BlogPost';
import { getPost } from '../util/api';

export default function PostDetailPage() {
  const post = useLoaderData();

  return (
    <>
      <BlogPost title={post.title} text={post.body} />
    </>
  );
}

export function loader({ params }) {
  return getPost(params.id);
}

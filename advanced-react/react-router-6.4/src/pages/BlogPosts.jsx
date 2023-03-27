import { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';

import Posts from '../components/Posts';
import { getPosts } from '../util/api';

export default function BlogPostsPage() {
  // first defer the value (means component should be rendered, even if data is not ready), then check for the loaderData in "Await Resolve", use "Suspense" to add the loading component, one data is ready, Await will render its "children render prop"
  const loaderData = useLoaderData();

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={loaderData.posts}>
          {posts => <Posts blogPosts={posts.filter((_, i) => i < 3)} />}
        </Await>
      </Suspense>
    </>
  );
}

export function loader() {
  // if we add await here, then it works like previously, when data is loaded, only then the page will appear
  return defer({ posts: getPosts() });
}

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import BlogLayout from './pages/BlogLayout';
import BlogPostsPage, {
  loader as blogPostsPageLoader,
} from './pages/BlogPosts';
import NewPostPage, { action as newPostAction } from './pages/NewPost';
import PostDetailPage, { loader as postDetailLoader } from './pages/PostDetail';
import RootLayout from './pages/RootLayout';
import WelcomePage from './pages/Welcome';
import { Fragment } from 'react';
import ErrorPage from './pages/ErrorPage';

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      // This route without path becomes root layout, that will be added in all the elements
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        {/* "index" route path the default path, if parent route path is activated */}
        <Route index element={<WelcomePage />} />
        <Route path="blog" element={<BlogLayout />}>
          <Route
            index
            element={<BlogPostsPage />}
            loader={blogPostsPageLoader}
          />
          <Route
            path=":id"
            element={<PostDetailPage />}
            loader={postDetailLoader}
          />
        </Route>
        <Route
          path="blog/new"
          element={<NewPostPage />}
          action={newPostAction}
        />
      </Route>
    )
  );

  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

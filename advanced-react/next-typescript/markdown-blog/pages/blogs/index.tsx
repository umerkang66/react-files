import { BlogList } from '@components/blogs';
import { PageLayout } from '@components/layouts';
import { Blog } from '@interfaces/blog';
import { getBlogs } from '@lib/blogs';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const BlogsPage: NextPage<Props> = ({ blogs }) => {
  return (
    <PageLayout pageTitle="All Blogs">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        All Blogs
      </h2>
      <BlogList blogs={blogs} />
    </PageLayout>
  );
};

type Returned = { blogs: Blog[] };

export const getStaticProps: GetStaticProps<Returned> = () => {
  const blogs = getBlogs();

  return {
    props: { blogs },
  };
};

export default BlogsPage;

import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  type NextPage,
} from 'next';

import { PageLayout } from '@components/layouts';
import { Blog } from '@interfaces/blog';
import { getBlogBySlugWithMarkdown, getBlogSlugs } from '@lib/blogs';
import { ParsedUrlQuery } from 'querystring';
import { BlogHeader } from '@components/blogs';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const BlogDetail: NextPage<Props> = ({ blog }) => {
  return (
    <PageLayout pageTitle={blog.title}>
      <div className="w-2/3 m-auto">
        {/* Blog Header Starts */}
        <BlogHeader blog={blog} />
        {/* Blog Header Ends */}
        <article className="prose lg:prose-lg markdown-image-50">
          {/* Blog Content Here */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </div>
    </PageLayout>
  );
};

type Returned = { blog: Blog };
interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<
  Returned,
  Params
> = async context => {
  const { slug } = context.params!;
  const blog = await getBlogBySlugWithMarkdown(slug);

  return { props: { blog } };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getBlogSlugs().map(slug => {
    return { params: { slug } };
  });

  return {
    paths,
    // all the blogs have been added, no need for fallback
    fallback: false,
  };
};

export default BlogDetail;

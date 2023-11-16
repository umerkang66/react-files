import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';

import { BlogList } from '@components/blogs';
import { BaseLayout } from '@components/layouts';
import { PortfolioList } from '@components/portfolios';
import { Blog } from '@interfaces/blog';
import { getBlogs } from '@lib/blogs';
import { populateSearchIndex } from '@lib/search';
import { getPortfolios } from '@lib/portfolios';
import { Portfolio } from '@interfaces/portfolio';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ blogs, portfolios }) => {
  return (
    <BaseLayout>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Newest Blogs
        <Link legacyBehavior href="/blogs">
          <a className="text-sm ml-1 text-indigo-600">(See All)</a>
        </Link>
      </h2>

      {/* Blog List Starts */}
      <BlogList blogs={blogs} />
      {/* Blog List Ends */}

      <br></br>

      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Portfolios
        <Link legacyBehavior href="/portfolios">
          <a className="text-sm ml-1 text-indigo-600">(See All)</a>
        </Link>
      </h2>

      <PortfolioList portfolios={portfolios} />
    </BaseLayout>
  );
};

type Returned = { blogs: Blog[]; portfolios: Portfolio[] };

export const getStaticProps: GetStaticProps<Returned> = () => {
  const blogs = getBlogs();
  const portfolios = getPortfolios();
  populateSearchIndex({ blogs, portfolios });

  return {
    props: {
      blogs: blogs.slice(0, 4),
      portfolios: portfolios.slice(0, 4),
    },
  };
};

export default Home;

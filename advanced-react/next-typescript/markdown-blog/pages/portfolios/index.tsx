import { PageLayout } from '@components/layouts';
import { PortfolioList } from '@components/portfolios';
import { Portfolio } from '@interfaces/portfolio';
import { getPortfolios } from '@lib/portfolios';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PortfoliosPage: NextPage<Props> = ({ portfolios }) => {
  return (
    <PageLayout pageTitle="All Portfolios">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        All Portfolios
      </h2>
      <PortfolioList portfolios={portfolios} />
    </PageLayout>
  );
};

type Returned = { portfolios: Portfolio[] };

export const getStaticProps: GetStaticProps<Returned> = () => {
  const portfolios = getPortfolios();

  return {
    props: { portfolios },
  };
};

export default PortfoliosPage;

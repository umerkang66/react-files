import { join } from 'path';
import { Portfolio } from '@interfaces/portfolio';
import {
  getAllItems,
  getDir,
  getFileNames,
  getItemInPath,
  markdownToHtml,
} from './md';

const PORTFOLIO_DIR = getDir('content/portfolios');

const getPortfolio = (fileName: string): Portfolio => {
  const portfolio = getItemInPath(join(PORTFOLIO_DIR, fileName)) as Portfolio;
  portfolio.slug = fileName.replace('.md', '');

  return portfolio;
};

const getPortfolioFileNames = () => getFileNames(PORTFOLIO_DIR);

const getPortfolios = (): Portfolio[] => {
  return getAllItems(getPortfolioFileNames(), getPortfolio) as Portfolio[];
};

const getPortfolioSlugs = () =>
  getPortfolioFileNames().map(portfolioFileName =>
    portfolioFileName.replace('.md', '')
  );

const getPortfolioBySlug = (slug: string) => getPortfolio(slug + '.md');

const getPortfolioBySlugWithMarkdown = async (
  slug: string
): Promise<Portfolio> => {
  const portfolio = getPortfolioBySlug(slug);
  portfolio.content = await markdownToHtml(portfolio.content);

  return portfolio;
};

export {
  getPortfolio,
  getPortfolioFileNames,
  getPortfolios,
  getPortfolioSlugs,
  getPortfolioBySlug,
  getPortfolioBySlugWithMarkdown,
};

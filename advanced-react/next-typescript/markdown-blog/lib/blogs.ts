import { join } from 'path';
import { Blog } from '@interfaces/blog';
import {
  getAllItems,
  getDir,
  getFileNames,
  getItemInPath,
  markdownToHtml,
} from './md';

const BLOG_DIR = getDir('content/blogs');

const getBlog = (fileName: string): Blog => {
  const blog = getItemInPath(join(BLOG_DIR, fileName)) as Blog;
  blog.slug = fileName.replace('.md', '');

  return blog;
};

const getBlogFileNames = () => getFileNames(BLOG_DIR);

const getBlogs = (): Blog[] => {
  return getAllItems(getBlogFileNames(), getBlog) as Blog[];
};

const getBlogSlugs = () =>
  getBlogFileNames().map(blogFileName => blogFileName.replace('.md', ''));

const getBlogBySlug = (slug: string) => getBlog(slug + '.md');

const getBlogBySlugWithMarkdown = async (slug: string): Promise<Blog> => {
  const blog = getBlogBySlug(slug);
  blog.content = await markdownToHtml(blog.content);

  return blog;
};

export {
  getBlog,
  getBlogFileNames,
  getBlogs,
  getBlogSlugs,
  getBlogBySlug,
  getBlogBySlugWithMarkdown,
};

import { join } from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

import { MarkdownItem } from '@interfaces/markdown';

const getDir = (path: string): string => join(process.cwd(), path);

const getFileNames = (dir: string): string[] => {
  return fs.readdirSync(dir);
};

const getItemInPath = (filePath: string): MarkdownItem => {
  const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'));

  return { ...data, content } as MarkdownItem;
};

const getAllItems = (
  fileNames: string[],
  get: (name: string) => MarkdownItem
) => {
  return (
    fileNames
      .map(fileName => get(fileName))
      // if first is greater than second, -1 means
      // don't sort,
      // if first is smaller than second, 1 means sort
      .sort((first, second) => (first.date > second.date ? -1 : 1))
  );
};

const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(remarkHtml)
    .use(remarkGfm)
    .process(markdown);

  return result.toString();
};

export { getDir, getFileNames, getItemInPath, getAllItems, markdownToHtml };

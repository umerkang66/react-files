import { Blog } from './blog';
import { Portfolio } from './portfolio';

export interface MarkdownItem {
  title: string;
  description: string;
  content: string;
  slug: string;
  date: string;
}

export interface MarkdownContent {
  blogs: Blog[];
  portfolios: Portfolio[];
}

export type ContentItemName = keyof MarkdownContent;

export interface SearchContent extends Omit<MarkdownItem, 'date' | 'content'> {
  category: ContentItemName;
}

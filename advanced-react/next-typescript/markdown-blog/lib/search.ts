import fs from 'fs';

import {
  MarkdownContent,
  ContentItemName,
  SearchContent,
} from '@interfaces/markdown';
import { getDir } from './md';

export function populateSearchIndex(data: MarkdownContent) {
  const searchFile = getDir('content/search/index.json');

  const searchItemList = Object.keys(data)
    .map(dataSource => {
      const source = dataSource as ContentItemName;

      return data[source].map(item => {
        return {
          title: item.title,
          description: item.description,
          slug: item.slug,
          category: source,
        } as SearchContent;
      });
    })
    .flat();

  fs.writeFileSync(searchFile, JSON.stringify(searchItemList, null, 2));
}

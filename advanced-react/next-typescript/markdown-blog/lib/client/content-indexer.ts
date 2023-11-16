import * as JsSearch from 'js-search';
import { SearchContent } from '@interfaces/markdown';
import { getLocaleSearchIndex } from './utils';

class ContentIndexer {
  private static instance: ContentIndexer;
  // definite assignment assertion
  private searchEngine!: JsSearch.Search;

  public static getInstance() {
    // this.instance object has no use directly, but it has use to check if only instance of this class exist
    return this.instance || (this.instance = new this());
  }

  public search(query: string): SearchContent[] {
    return this.searchEngine.search(query) as SearchContent[];
  }

  constructor() {
    // this will be used by getInstance method
    this.buildIndex();
  }

  private buildIndex() {
    // unique identifier for every item is "slug"
    this.searchEngine = new JsSearch.Search('slug');
    // search in these two fields
    this.searchEngine.addIndex('title');
    this.searchEngine.addIndex('description');
    // add the data to engine
    this.searchEngine.addDocuments(getLocaleSearchIndex());
  }
}

const contentIndexer = ContentIndexer.getInstance();
export { contentIndexer };

import { useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { contentIndexer } from '@lib/client/content-indexer';
import { useRouter } from 'next/router';
import { SearchContent } from '@interfaces/markdown';

const ContentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchContent[]>([]);
  const searchResultsRef = useRef<any>();
  const inputRef = useRef<any>();

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (inputRef.current &&
          searchResultsRef.current &&
          (searchResultsRef.current.contains(event.target) ||
            inputRef.current.contains(event.target))) ||
        results.length === 0
      ) {
        return;
      }

      setResults([]);
    };

    const escKeyCallback = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchTerm('');
        setResults([]);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', escKeyCallback);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', escKeyCallback);
    };
  }, [results.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const results = contentIndexer.search(searchTerm);

      setResults(results);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          ref={inputRef}
          id="search-input"
          autoComplete="off"
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search for anything"
        />
      </div>
      {results.length > 0 && (
        <ul
          ref={searchResultsRef}
          className="w-80 border-solid border rounded-md z-10 bg-white max-h-80 overflow-auto absolute select is-multiple"
          role="listbox"
        >
          {results.map(result => {
            const generatedUrl = `/${result.category}/${result.slug}`;

            return (
              <li
                key={result.slug}
                onClick={() => router.push(generatedUrl)}
                className={`hover:bg-indigo-600 hover:text-white p-3 relative cursor-pointer`}
              >
                <div className="font-bold text-sm truncate">{result.title}</div>
                <p className="truncate text-sm">{result.description}</p>
                <span className="mt-2 text-xs text-white bg-gray-800 px-2 py-1 rounded-xl">
                  {result.category}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ContentSearch;

import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { Species } from './Species';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async url => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['sw-species'],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    // if page param is undefined, it will determine, that there is no nextPage
    getNextPageParam: previousData => previousData.next || undefined,
  });

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}

      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map(pageData =>
          pageData.results.map((specie, i) => (
            <Species
              key={i}
              name={specie.name}
              language={specie.language}
              averageLifespan={specie.average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}

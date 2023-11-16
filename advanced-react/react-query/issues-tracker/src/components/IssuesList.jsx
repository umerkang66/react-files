import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IssueItem } from './IssueItem';
import { fetchWithError } from '../helpers/fetchWithError';
import { Loader } from './Loader';

function IssuesList({ labels, status, pageNum, setPageNum }) {
  const queryClient = useQueryClient();

  const issuesQuery = useQuery(
    ['issues', { labels, status, pageNum }],
    async ({ signal }) => {
      const labelsString = labels.map(label => `labels[]=${label}`).join('&');
      const statusString = status ? `&status=${status}` : '';
      const paginationString = pageNum ? `&page=${pageNum}` : '';

      const results = await fetchWithError(
        `/api/issues?${labelsString}${statusString}${paginationString}`,
        { signal }
      );

      results.forEach(issue => {
        queryClient.setQueryData(
          // this query key 'issue.number' is actually string
          ['issues', issue.number.toString()],
          issue
        );
      });

      return results;
    },
    { staleTime: 1000 * 60, keepPreviousData: true } // 1 Minute
  );

  const [searchValue, setSearchValue] = useState('');

  const searchQuery = useQuery(
    ['issues', 'search', searchValue],
    ({ signal }) =>
      fetchWithError(`/api/search/issues?q=${searchValue}`, { signal }),
    { enabled: !!searchValue }
  );

  return (
    <div>
      <h3>Issues List {issuesQuery.isLoading && <Loader />}</h3>

      <form
        onSubmit={e => {
          e.preventDefault();
          setSearchValue(e.target.elements.search.value);
        }}
      >
        <label htmlFor="search">Search Issues</label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          onChange={e => {
            if (e.target.value.length === 0) {
              setSearchValue('');
            }
          }}
        />
      </form>

      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : searchQuery.fetchStatus === 'idle' && searchQuery.isLoading ? (
        <>
          {issuesQuery.isError ? (
            issuesQuery.error.message
          ) : (
            <>
              <ul className="issues-list">
                {issuesQuery.data.map(issue => (
                  <IssueItem
                    key={issue.id}
                    title={issue.title}
                    number={issue.number}
                    assignee={issue.assignee}
                    commentCount={issue.commentCount}
                    createdBy={issue.createdBy}
                    createdDate={issue.createdDate}
                    labels={issue.labels}
                    status={issue.status}
                  />
                ))}
              </ul>
              <div className="pagination">
                <button
                  onClick={() =>
                    setPageNum(prev => (prev - 1 <= 0 ? 1 : prev - 1))
                  }
                  disabled={pageNum <= 1}
                >
                  Previous
                </button>
                <p>
                  Page {pageNum} {issuesQuery.isFetching ? '...' : ''}
                </p>
                <button
                  onClick={() =>
                    issuesQuery.data?.length !== 0 &&
                    !issuesQuery.isPreviousData &&
                    setPageNum(prev => prev + 1)
                  }
                  disabled={
                    issuesQuery.data?.length === 0 ||
                    // data has not updated, it is still previousData in the query
                    issuesQuery.isPreviousData
                  }
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <h2>Search Results</h2>
          {searchQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{searchQuery.data.count} Results</p>
              <ul className="issues-list">
                {searchQuery.data.items.map(issue => (
                  <IssueItem
                    key={issue.id}
                    title={issue.title}
                    number={issue.number}
                    assignee={issue.assignee}
                    commentCount={issue.commentCount}
                    createdBy={issue.createdBy}
                    createdDate={issue.createdDate}
                    labels={issue.labels}
                    status={issue.status}
                  />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default IssuesList;

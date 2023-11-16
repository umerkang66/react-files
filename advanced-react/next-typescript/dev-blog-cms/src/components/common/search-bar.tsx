import { FormEventHandler, type FC, useState } from 'react';

type Props = { onSubmit?: (query: string) => void };

const SearchBar: FC<Props> = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    onSubmit && onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search..."
        type="text"
        className="rounded border-2 border-secondary-dark bg-transparent p-2 text-primary-dark outline-none transition focus:border-primary-dark dark:text-primary dark:focus:border-primary"
        onChange={e => setQuery(e.target.value)}
        value={query}
      />
    </form>
  );
};

export { SearchBar };

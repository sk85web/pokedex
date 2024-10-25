import React, { useState, useEffect } from 'react';

import Button from './ui/Button';

type Props = {
  onSearch: (query: string) => void;
  searchQuery: string;
};

const SearchBar: React.FC<Props> = ({ onSearch, searchQuery }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery === '') {
      onSearch('');
    } else {
      onSearch(trimmedQuery);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full flex-wrap sm:flex items-center space-x-2"
      >
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="border-2 p-2 flex-grow rounded-md"
          placeholder="Search Pokémon..."
        />
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 mt-2 sm:mt-0"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;

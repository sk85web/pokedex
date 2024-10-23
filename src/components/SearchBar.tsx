import React, { useState } from 'react';

import Button from './ui/Button';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
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

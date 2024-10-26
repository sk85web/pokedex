import { getAllTypes } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type FilterProps = {
  onChange: (value: string) => void;
  selectedType: string;
};

const FilterBar: React.FC<FilterProps> = ({ onChange, selectedType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { types } = useSelector((state: RootState) => state.pokemons);
  const [value, setValue] = useState('All');

  const sortedTypes = [...types].sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  useEffect(() => {
    setValue(selectedType);
    navigate('/');
  }, [selectedType]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    onChange(selectedValue);
  };

  const resetFilter = () => {
    setValue('All');
    onChange('All');
  };

  return (
    <div className="self-start flex gap-8 justify-center items-center">
      <select
        name="select"
        value={value}
        onChange={handleChange}
        className="border-2 p-2 flex-grow rounded-md min-w-{130px}"
        aria-label="Filter Pokémon by type"
      >
        <option value={'All'}>All</option>
        {sortedTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <span className="flex items-center border-b-amber-300 border-b px-2 ">
        {value}
        {value !== 'All' && (
          <button
            onClick={resetFilter}
            className="ml-2 p-1 text-gray-500 text-2xl hover:text-gray-800"
            aria-label="Clear filter"
          >
            &times;
          </button>
        )}
      </span>
    </div>
  );
};

export default FilterBar;

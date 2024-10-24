import { getAllTypes } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import React, { useEffect, useState } from 'react';

type FilterProps = {
  onChange: (value: string) => void;
};

const FilterBar: React.FC<FilterProps> = ({ onChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { types } = useSelector((state: RootState) => state.pokemons);
  const [value, setValue] = useState('all');

  const sortedTypes = [...types].sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value[0].toUpperCase() + e.target.value.slice(1);
    setValue(value);
    onChange(e.target.value);
  };

  return (
    <>
      <select name="select" defaultValue={'all'} onChange={handleChange}>
        <option value={'all'}>All</option>
        {sortedTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <span>{value}</span>
    </>
  );
};

export default FilterBar;

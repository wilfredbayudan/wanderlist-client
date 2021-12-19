import React from 'react';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SearchAndSort = styled.div`
  display: flex;
  padding: 8px;
  gap: 10px;
  margin-top: 10px;
`;

const SearchBar = ({ search, setSearch, sort, setSort, sortOptions }) => {

  const handleSearchChange = e => {
    setSearch(e.target.value);
  }

  const handleSortChange = e => {
    setSort(e.target.value);
  }

  return (
    <SearchAndSort>
      <TextField
        size="small"
        label="Search..."
        value={search}
        onChange={handleSearchChange}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort By"
          onChange={handleSortChange}
          size="small"
        >
          {
            sortOptions.map((sortOption, index) => {
              return <MenuItem key={index} value={sortOption.value}>{sortOption.label}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </SearchAndSort>
  )
}

export default SearchBar;
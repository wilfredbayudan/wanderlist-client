import React, { useState } from 'react';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import styled from 'styled-components';

const SearchBar = styled.form`
  display: flex;
  padding: 10px;
  gap: 10px;
`

const SearchForm = ({ handleSearch }) => {

  const [searchInput, setSearchInput] = useState('')

  const handleChange = e => {
    setSearchInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchInput);
    setSearchInput('');
  }

  console.log(searchInput)

  return (
    <SearchBar onSubmit={handleSubmit}>
      <TextField
        value={searchInput}
        onChange={handleChange}
        fullWidth
        name="search"
        label="Add a new destination..."
        size="small"
      />
      <LoadingButton variant="outlined" type="submit">Search</LoadingButton>
    </SearchBar>
  )
}

export default SearchForm;
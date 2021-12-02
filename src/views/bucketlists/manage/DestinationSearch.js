import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from './SearchForm';

const SearchCard = styled.div`
  width: 100%;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;

const DestinationSearch = ({ appState }) => {

  const { setLoaderStatus } = appState;

  const [results, setResults] = useState([]);

  const handleSearch = searchInput => {
    setLoaderStatus(true);
    console.log(`Searching for ${searchInput}`);
    fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITIONSTACK_KEY}&query=${searchInput}&limit=5&output=json`)
      .then(res => res.json())
      .then(json => {
        setLoaderStatus(false);
        setResults(json.data.map(result => {
          return {
            label: result.label,
            lat: result.latitude,
            lng: result.longitude
          }
        }))
      })
      .catch(err => console.log(err));
  } 

  console.log(results);

  return (
    <SearchCard>
      <SearchForm handleSearch={handleSearch} />
    </SearchCard>
  )
}

export default DestinationSearch;
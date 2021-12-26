import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

const SearchCard = styled.div`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;

const DestinationSearch = ({ appState, authPin }) => {

  const { setLoaderStatus } = appState;

  const [results, setResults] = useState([]);

  const handleSearch = searchInput => {
    setLoaderStatus(true);
    console.log(`Searching for ${searchInput}`);
    fetch(`https://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITIONSTACK_KEY}&query=${searchInput}&limit=3`)
      .then(res => res.json())
      .then(json => {
        setLoaderStatus(false);
        console.log(json);
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

  return (
    <SearchCard>
      <SearchForm handleSearch={handleSearch} />
      <SearchResults results={results} appState={appState} authPin={authPin} />
    </SearchCard>
  )
}

export default DestinationSearch;
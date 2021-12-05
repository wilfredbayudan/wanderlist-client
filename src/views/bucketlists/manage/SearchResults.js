import React from 'react';
import styled from 'styled-components';
import SearchResultsItem from './SearchResultsItem';

const List = styled.ul`
  width: 100%;
  padding: 0px;
  margin: 0;
`;

const SearchResults = ({ appState, results, authPin }) => {

  const { bucketlist } = appState;

  const existingDestinations = bucketlist.bucketlist_locations;

  const existingKeys = {};

  existingDestinations.forEach(destination => {
    existingKeys[destination.location.label] = true;
  })

  const renderResults = results.map((result, index) => {
    if (bucketlist && result.label in existingKeys) {
      return null;
    }
    return <SearchResultsItem key={`Result_${index}`} location={result} appState={appState} authPin={authPin} />
  })

  return (
    <List>
      {renderResults}
    </List>
  )    
}

export default SearchResults;
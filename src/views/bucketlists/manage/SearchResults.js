import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  width: 100%;
  padding: 0px;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  cursor: pointer;
  color: #aaaaaa;
  &:hover {
    background-color: #d7f2ff;
    color: #000000;
  }
`;

const SearchResults = ({ appState, results }) => {
  return (
    <List>
      { results.map((result, index) => {
        return <ListItem key={index}>{result.label}</ListItem>
      }) }
    </List>
  )    
}

export default SearchResults;
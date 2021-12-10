import React from 'react';
import DestinationsListItem from './DestinationsListItem';
import styled from 'styled-components';

const P = styled.p`
  margin: 0;
  padding: 15px;
`;

const DestinationsList = ({ appState, filteredDestinations }) => {

  if (filteredDestinations.length > 0) {
    return (
      <div>
        {filteredDestinations.map((destination, index) => {
          return (
            <DestinationsListItem key={index} appState={appState} destination={destination} />
          )
        })}
      </div>
    )
  }
  return <P>No destinations found.</P>
}

export default DestinationsList;
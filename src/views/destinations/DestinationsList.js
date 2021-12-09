import React from 'react';
import DestinationsListItem from './DestinationsListItem';

const DestinationsList = ({ appState, filteredDestinations }) => {
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

export default DestinationsList;
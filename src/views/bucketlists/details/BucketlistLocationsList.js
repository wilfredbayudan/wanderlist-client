import React from 'react';
import BucketlistLocationsListItem from './BucketlistLocationsListItem';

function BucketlistLocationsList({ appState, locations, auth, manageMode }) {
  
  const renderLocations = locations.map((location, index) => {
    return <BucketlistLocationsListItem manageMode={manageMode} key={index} auth={auth} appState={appState} markerNum={index+1} location={location} />
  })

  return (
    <>
      {renderLocations}
    </>
  )
}

export default BucketlistLocationsList;
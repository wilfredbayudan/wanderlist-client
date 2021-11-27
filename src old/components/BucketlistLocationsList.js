import React from 'react';
import BucketlistLocationsListItem from './BucketlistLocationsListItem';

function BucketlistLocationsList({ locations, setViewport, viewport }) {
  
  const renderLocations = locations.map((location, index) => {
    return <BucketlistLocationsListItem key={index} viewport={viewport} setViewport={setViewport} markerNum={index+1} location={location} />
  })

  return (
    <>
      {renderLocations}
    </>
  )
}

export default BucketlistLocationsList;
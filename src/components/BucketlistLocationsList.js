import React from 'react';
import styled from 'styled-components';
import BucketlistLocationsListItem from './BucketlistLocationsListItem';

// const List = styled.ul`
//   margin: 0;
//   padding: 0;
//   width: 100%;
// `;

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
import React, { useEffect } from 'react';

const HomePage = ({ appState }) => {
  
  const { setMarkers, destinations } = appState;

  const generateMarkerColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    if (destinations) {
      setMarkers(destinations.filter(filterDestination => filterDestination.bucketlists.length > 0).map(destination => {
        return {
          ...destination,
          color: generateMarkerColor()
        }
      }));
    }
  }, [setMarkers, destinations])

  return (
    <></>
  )
};

export default HomePage;
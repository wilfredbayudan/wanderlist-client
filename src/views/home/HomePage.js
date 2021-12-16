import React, { useEffect } from 'react';

const HomePage = ({ appState }) => {
  
  const { setMarkers, destinations } = appState;

  useEffect(() => {
    if (destinations) {
      setMarkers(destinations);
    }
  }, [setMarkers, destinations])

  return (
    <></>
  )
};

export default HomePage;
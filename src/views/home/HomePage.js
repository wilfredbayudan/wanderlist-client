import React, { useEffect } from 'react';

const HomePage = ({ appState }) => {
  
  const { setMarkers, destinations } = appState;

  // const generateMarkerColor = () => {
  //   let letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  const stringToColour = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  useEffect(() => {
    if (destinations) {
      setMarkers(destinations.filter(filterDestination => filterDestination.bucketlists.length > 0).map(destination => {
        return {
          ...destination,
          color: stringToColour(destination.label)
        }
      }));
    }
  }, [setMarkers, destinations])

  return (
    <></>
  )
};

export default HomePage;
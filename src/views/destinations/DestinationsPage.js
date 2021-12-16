import React, { useEffect } from 'react';
import DestinationsList from './DestinationsList';
import LoaderOverlay from '../../components/LoaderOverlay';

const DestinationsPage = ({ appState }) => {

  const { destinations, setDisplayContent, setMarkers, setCurrentList } = appState;

  useEffect(() => {
    if (destinations) {
      setDisplayContent(true);
      setMarkers([]);
      setCurrentList(null);
    }
  }, [destinations, setDisplayContent, setMarkers, setCurrentList])

  if (destinations) {
    return (
      <div>
        <DestinationsList filteredDestinations={destinations} appState={appState} />
      </div>
    )
  }
  return <LoaderOverlay loaderStatus />
}

export default DestinationsPage;
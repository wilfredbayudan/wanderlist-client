import React, { useEffect } from 'react';
import DestinationsList from './DestinationsList';
import LoaderOverlay from '../../components/LoaderOverlay';

const DestinationsPage = ({ appState }) => {

  const { destinations, setDisplayContent } = appState;

  useEffect(() => {
    if (destinations) {
      setDisplayContent(true);
    }
  }, [destinations, setDisplayContent])

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
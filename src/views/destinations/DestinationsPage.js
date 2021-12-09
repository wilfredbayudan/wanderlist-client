import React, { useEffect } from 'react';
import DestinationsList from './DestinationsList';
import LoaderOverlay from '../../components/LoaderOverlay';

const DestinationsPage = ({ appState: { destinations, setDestinations, setLoaderStatus, setDisplayContent, fetchedDestinations, setFetchedDestinations } }) => {

  useEffect(() => {
    if (destinations) {
      setDisplayContent(true);
    }
  }, [destinations, setDisplayContent])

  if (destinations) {
    return (
      <div>
        <DestinationsList filteredDestinations={destinations} />
      </div>
    )
  }
  return <LoaderOverlay loaderStatus />
}

export default DestinationsPage;
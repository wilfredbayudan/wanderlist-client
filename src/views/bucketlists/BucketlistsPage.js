import React, { useEffect } from 'react';
import BucketlistsList from './BucketlistsList';
import LoaderOverlay from '../../components/LoaderOverlay';

const Bucketlists = ({ appState }) => {

  const { setDisplayContent, bucketlists, setBucketlists } = appState;

  useEffect(() => {
    if (bucketlists) {
      setDisplayContent(true);
    }
  }, [bucketlists, setDisplayContent])

  if (bucketlists) {
    return (
       <BucketlistsList appState={appState} bucketlists={bucketlists} setBucketlists={setBucketlists} />
    )
  }
  return <LoaderOverlay loaderStatus />
}

export default Bucketlists;
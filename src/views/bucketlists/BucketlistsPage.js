import React, { useEffect, useState } from 'react';
import BucketlistsList from './BucketlistsList';
import LoaderOverlay from '../../components/LoaderOverlay';

const Bucketlists = ({ appState }) => {

  const { setDisplayContent, bucketlists, setBucketlists } = appState;

  useEffect(() => {

    if (bucketlists) {
      setDisplayContent(true);
    } else {
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists`)
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        setBucketlists(json);
        setDisplayContent(true);
      })
      .catch(err => console.log(err))      
    }

  }, [bucketlists, setBucketlists, setDisplayContent]);

  if (bucketlists) {
    return (
       <BucketlistsList appState={appState} bucketlists={bucketlists} setBucketlists={setBucketlists} />
    )
  }
  return <LoaderOverlay loaderStatus />
}

export default Bucketlists;
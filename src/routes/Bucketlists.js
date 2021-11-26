import React, { useEffect } from 'react';
import BucketlistList from '../components/BucketlistList';
import LoaderOverlay from '../components/LoaderOverlay';

const Bucketlists = ({ bucketlists, setMarkers, setCurrentList, setBucketlist, setBucketlists, setDisplayContent, setLoaderStatus }) => {

  useEffect(() => {
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists`)
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        setBucketlists(json);
        setDisplayContent(true);
      })
      .catch(err => console.log(err))

  }, [setBucketlists, setDisplayContent]);

  if (bucketlists) {
    return (
      <div>
        <BucketlistList setLoaderStatus={setLoaderStatus} setBucketlist={setBucketlist} bucketlists={bucketlists} setMarkers={setMarkers} setCurrentList={setCurrentList} />
      </div>
    )
  }
  return <LoaderOverlay loaderStatus />
}

export default Bucketlists;
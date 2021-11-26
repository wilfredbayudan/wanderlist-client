import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoaderOverlay from '../components/LoaderOverlay';
import styled from 'styled-components';
import timeAgo from '../functions/timeAgo';
import mapLocationData from '../functions/mapLocationData';
import BucketlistLocationsList from '../components/BucketlistLocationsList';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';

const BucketlistHeader = styled.div`
  width: 100%;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;

const LastUpdated = styled.span`
  font-size: 0.8em;
  color: #696969;
`;

function Bucketlist({ viewport, setViewport, setMarkers, bucketlist, setBucketlist, setDisplayContent, setCurrentList }) {
  const params = useParams();

  useEffect(() => {
    if (bucketlist) {
      setCurrentList({ name: bucketlist.name, created_by: bucketlist.created_by });
      setMarkers(mapLocationData(bucketlist.bucketlist_locations));
      setViewport({
        ...viewport,
        latitude: 11.1784,
        longitude: 90.8129,
        zoom: 1,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic
      });
    } else {
      fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${params.id}`)
        .then(res => res.json())
        .then(json => {
          setBucketlist(json);
          setDisplayContent(true);
        })
        .catch(err => console.log(err));
    }
  }, [params.id, setBucketlist, setDisplayContent, bucketlist, setCurrentList, setMarkers, setViewport, viewport])

  if (bucketlist) {

    const lastUpdated = timeAgo(bucketlist.updated_at)

    return (
      <>
        <BucketlistHeader>
          <h2>{bucketlist.name}</h2>
          <p>{bucketlist.description}</p>
          <LastUpdated>Last updated {lastUpdated} by <b>{bucketlist.created_by}</b></LastUpdated>
        </BucketlistHeader>
        <BucketlistLocationsList viewport={viewport} setViewport={setViewport} locations={bucketlist.bucketlist_locations} />
      </>
    )
  }
  return <LoaderOverlay loaderStatus />
}

export default Bucketlist
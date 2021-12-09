import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import LoaderOverlay from '../../../components/LoaderOverlay';
import styled from 'styled-components';
import timeAgo from '../../../utils/timeAgo';
import mapLocationData from '../../../utils/mapLocationData';
import BucketlistLocationsList from './BucketlistLocationsList';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import TextField from '@mui/material/TextField';
import DestinationSearch from '../manage/DestinationSearch';

const BucketlistHeader = styled.div`
  width: 100%;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;

const LastUpdated = styled.span`
  font-size: 0.8em;
  color: #696969;
`;

const Description = styled.p`
  width: 100%;
  padding: 10px 6px;
  border-radius: 5px;
  background-color: #f2f2f2;
  font-size: 0.9em;
`

function Bucketlist( { appState }) {

  const { setViewport, setMarkers, setDisplayContent, setCurrentList, bucketlist, setBucketlist, bucketlists, setBucketlists } = appState;

  const [isAuth, setIsAuth] = useState(false);

  const params = useParams();

  const [searchParams] = useSearchParams();

  const authPin = searchParams.get('pin');

  useEffect(() => {
    if (bucketlists && authPin === bucketlists.find(list => list.id === parseInt(params.id)).pin) {
      setIsAuth(true);
    } else if (bucketlist && "pin" in bucketlist) {
      setIsAuth(true);
    } else if (params.id && authPin && !isAuth && bucketlists) {
      console.log('Fetching...')
      fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${params.id}/auth`, {
        headers: {
          'PIN': authPin
        }
      })
        .then(res => res.json())
        .then(json => {
          setIsAuth(json.permission);
          if (json.permission) {
            setBucketlists(bucketlists.map(mappedList => {
              if (mappedList.id === parseInt(params.id)) {
                return {
                  ...mappedList,
                  pin: authPin
                }
              }
              return mappedList;
            }))
          }
        })
        .catch(err => console.log(err))
    }
    return
  }, [bucketlist, params.id, authPin, setIsAuth, bucketlists, setBucketlists, isAuth])

  useEffect(() => {
    if (bucketlist) {
      setDisplayContent(true);
      setCurrentList({ name: bucketlist.name, created_by: bucketlist.created_by });
      setMarkers(mapLocationData(bucketlist.bucketlist_destinations));
      setViewport({
        latitude: 11.1784,
        longitude: 90.8129,
        zoom: 1,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic
      });
    } else {
      console.log('fetching bucketlist....')
      fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${params.id}`)
        .then(res => res.json())
        .then(json => {
          setBucketlist(json);
          setDisplayContent(true);
        })
        .catch(err => console.log(err));
    }
  }, [params.id, setBucketlist, setDisplayContent, bucketlist, setCurrentList, setMarkers, setViewport])

  const authDisplay = (display) => {
    if (isAuth) {
      return display;
    }
  }

  const auth = isAuth ? authPin : false;

  if (bucketlist) {

    const lastUpdated = timeAgo(bucketlist.updated_at)

    return (
      <>
        <BucketlistHeader>
          <h2>{bucketlist.name}</h2>
          { 
            authDisplay(<TextField fullWidth label="Manage this listing at" disabled size="small" value={`${process.env.REACT_APP_WANDERLIST_URL}/bucketlists/${bucketlist.id}?pin=${authPin}`}/>)
          }
          <Description>{bucketlist.description}</Description>
          <LastUpdated>Added {lastUpdated} by <b>{bucketlist.created_by}</b></LastUpdated>
        </BucketlistHeader>
          {
            authDisplay(<DestinationSearch appState={appState} authPin={authPin} />)
          }
        <BucketlistLocationsList auth={auth} appState={appState} locations={bucketlist.bucketlist_destinations} />
      </>
    )
  }
  return <LoaderOverlay loaderStatus />
}

export default Bucketlist
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import LoaderOverlay from '../../../components/LoaderOverlay';
import styled from 'styled-components';
import timeAgo from '../../../utils/timeAgo';
import mapLocationData from '../../../utils/mapLocationData';
import BucketlistLocationsList from './BucketlistLocationsList';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import DestinationSearch from '../manage/DestinationSearch';
import DeleteBucketlist from '../manage/DeleteBucketlist';
import Description from './Description';
import BucketlistLike from './BucketlistLike';
import CommentAction from '../../../components/CommentAction';
import ManageUrl from './ManageUrl';
import Manage from '../manage/Manage';

const BucketlistHeader = styled.div`
  width: 100%;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;

const CreatedAt = styled.span`
  font-size: 0.8em;
  color: #696969;
`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`; 

const Actions = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

function Bucketlist( { appState }) {

  const { setPopup, setDialog, setViewport, setMarkers, setDisplayContent, setCurrentList, bucketlist, setBucketlist, bucketlists, setBucketlists } = appState;

  const [isAuth, setIsAuth] = useState(false);

  const params = useParams();

  const [searchParams] = useSearchParams();

  const authPin = searchParams.get('pin');

  const navigate = useNavigate();

  useEffect(() => {
    if (bucketlist && bucketlist.id === parseInt(params.id)) {
      setDisplayContent(true);
    } else {
      setDisplayContent(false);
    }
  }, [setDisplayContent, bucketlist, params.id])

  useEffect(() => {
    setPopup(false);
    if (bucketlists && bucketlist) {
      const selectedList = bucketlists.find(findList => findList.id === parseInt(params.id));
      if ("pin" in selectedList) {
        setIsAuth(true);
        return;
      }
    }
    if (bucketlist && "pin" in bucketlist) {
      setIsAuth(true);
    } else if (params.id && authPin && !isAuth && bucketlists) {
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
            setBucketlist({
              ...bucketlist,
              pin: authPin
            })
          }
        })
        .catch(err => console.log(err))
    }
    return
  }, [setPopup, bucketlist, params.id, authPin, setIsAuth, bucketlists, setBucketlists, isAuth, setBucketlist])

  useEffect(() => {
    if (bucketlist && bucketlist.id === parseInt(params.id)) {
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
      fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${params.id}`)
        .then(res => {
          if (res.status < 500) {
            return res.json();
          } else {
            setDialog('Bucketlist not found.');
            navigate('/bucketlists');
          }
        })
        .then(json => {
          setBucketlist(json);
          setDisplayContent(true);
        })
        .catch(err => console.log(err));
    }
  }, [params.id, setBucketlist, setDisplayContent, bucketlist, setCurrentList, setMarkers, setViewport, navigate, setDialog])

  const authDisplay = (display, nonAuthDisplay=null) => {
    if (isAuth) {
      return display;
    }
    return nonAuthDisplay;
  }

  const auth = isAuth ? authPin : false;

  if (bucketlist && bucketlist.id === parseInt(params.id)) {

    const createdAt = timeAgo(bucketlist.created_at);

    return (
      <>
        <BucketlistHeader>
          <Name>
            <h2>{bucketlist.name}</h2>
            {
              authDisplay(<DeleteBucketlist appState={appState} authPin={authPin} />)
            }
          </Name>
          { 
            authDisplay(<ManageUrl manageUrl={`${process.env.REACT_APP_WANDERLIST_URL}/bucketlists/${bucketlist.id}?pin=${authPin}`} />)
          }
          <Description appState={appState} description={bucketlist.description} auth={auth} />
          <CreatedAt>Added {createdAt} by <b>{bucketlist.created_by}</b></CreatedAt>
          <Actions>
            <BucketlistLike appState={appState} />
            <CommentAction source={bucketlist} setSource={setBucketlist} type="bucketlist" isAuth={auth} />
          </Actions>
        </BucketlistHeader>
          {
            authDisplay(<DestinationSearch appState={appState} authPin={authPin} />)
          }
        <BucketlistLocationsList auth={auth} appState={appState} locations={bucketlist.bucketlist_destinations} />
        {
          !isAuth ?
            <Manage bucketlistId={bucketlist.id} />
          : ''
        }
      </>
    )
  }
  return <LoaderOverlay loaderStatus />
}

export default Bucketlist
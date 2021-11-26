import React from 'react';
import styled from 'styled-components';
import BucketlistListItem from './BucketlistListItem';

const List = styled.ul`
  width: 100%;
  padding: 0px;
  margin: 0;
`;

const BucketlistList = ({ bucketlists, setMarkers, setCurrentList, setBucketlist, setLoaderStatus }) => {

  return (
    <List>
      {bucketlists.map(bucketlist => <BucketlistListItem key={bucketlist.id} setLoaderStatus={setLoaderStatus} setBucketlist={setBucketlist} bucketlist={bucketlist} setMarkers={setMarkers} setCurrentList={setCurrentList} />)}
    </List>
  )
}

export default BucketlistList;
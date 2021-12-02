import React from 'react';
import styled from 'styled-components';
import BucketlistsListItem from './BucketlistsListItem';

const List = styled.ul`
  width: 100%;
  padding: 0px;
  margin: 0;
`;

const BucketlistsList = ({ appState, bucketlists}) => {

  return (
    <List>
      {bucketlists.map(bucketlist => <BucketlistsListItem key={bucketlist.id} appState={appState} bucketlist={bucketlist} />)}
    </List>
  )
}

export default BucketlistsList;
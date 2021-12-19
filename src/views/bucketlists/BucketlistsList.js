import React from 'react';
import styled from 'styled-components';
import BucketlistsListItem from './BucketlistsListItem';

const List = styled.ul`
  width: 100%;
  padding: 0px;
  margin: 0;
`;

const P = styled.p`
  padding: 15px;
  margin: 0;
`;

const BucketlistsList = ({ appState, bucketlists}) => {

  if (bucketlists.length > 0) {
    return (
      <List>
        {bucketlists.map(bucketlist => <BucketlistsListItem key={bucketlist.id} appState={appState} selectedBucketlist={bucketlist} />)}
      </List>
    )
  }
  return <P>No bucketlists found!</P>
}

export default BucketlistsList;
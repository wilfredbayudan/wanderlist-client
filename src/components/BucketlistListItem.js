import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import mapLocationData from '../functions/mapLocationData';

const Bucketlist = styled.li`
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  cursor: pointer;
  &:hover {
    background-color: #d7f2ff;
  }
`;

const Name = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: bold;
`;

const Description = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.9em;
  color: #1a1a1a;
`;

const CreatedBy = styled.span`
  display: block;
  width: 100%;
  text-align: right; 
  font-size: 0.8em;
  color: #696969;
`;

const BucketlistListItem = ({ bucketlist, setMarkers, setCurrentList, setBucketlist, setLoaderStatus }) => {

  const navigate = useNavigate();

  const coordinates = mapLocationData(bucketlist.bucketlist_locations);

  function assignMarkers() {
    setMarkers(coordinates);
    setCurrentList({ name: bucketlist.name, created_by: bucketlist.created_by })
  }

  function handleClick() {
    setLoaderStatus(true);
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${bucketlist.id}`)
      .then(res => res.json())
      .then(json => {
        setBucketlist(json);
        setLoaderStatus(false);
        navigate(`/bucketlists/${bucketlist.id}`);
      })
      .catch(err => console.log(err));
  }

  return (
    <Bucketlist onMouseEnter={assignMarkers} onClick={handleClick}>
      <Name>{bucketlist.name}</Name>
      <Description>{bucketlist.description}</Description>
      <CreatedBy>By {bucketlist.created_by}</CreatedBy>
    </Bucketlist>
  )
};

export default BucketlistListItem;

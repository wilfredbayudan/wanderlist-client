import React from 'react';
import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import { WrongLocationOutlined } from '@mui/icons-material';

// const Li = styled.li`
//   padding: 10px;
//   box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
//   cursor: pointer;
//   &:hover {
//     background-color: #d7f2ff;
//   }
// `;

const StyledAccordion = styled(Accordion)`
  &:hover {
    background-color: #d7f2ff;
  }
`;

const Notes = styled.p`
  font-size: 0.8em;
  padding: 0;
  margin: 0;
`;

const StyledTypography = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DeleteLocationIcon = styled(WrongLocationOutlined)`
color: #a92e12;
  &:hover {
    color: #c7532b;
  }
`;

function BucketlistLocationsListItem({ location, markerNum, appState, auth }) {

  const { viewport, setViewport, bucketlist, setBucketlist, setLoaderStatus } = appState;

  console.log(bucketlist);

  function flyToLocation() {
    setViewport({
      ...viewport,
      longitude: location.location.lng,
      latitude: location.location.lat,
      zoom: 6,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    });
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log('Deleting...');
    setLoaderStatus(true);
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${bucketlist.id}/locations/${location.id}`, {
      method: 'DELETE',
      headers: {
        'PIN': auth,
      }
    })
      .then(res => res.json())
      .then(json => {
        setLoaderStatus(false);  
        setBucketlist({
          ...bucketlist,
          bucketlist_locations: bucketlist.bucketlist_locations.filter(location => location.id !== json.id)
        })        
      })
      .catch(err => console.log(err))
  } 

  return (
    <StyledAccordion onClick={flyToLocation}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <StyledTypography><span>{markerNum}. {location.location.label}</span> 
        { auth ? <DeleteLocationIcon onClick={handleDelete} /> : '' }
        </StyledTypography>
      </AccordionSummary>
      <AccordionDetails>
        <Notes>{location.notes ? location.notes : 'No notes'}</Notes>
      </AccordionDetails>
    </StyledAccordion>
  )
}

export default BucketlistLocationsListItem
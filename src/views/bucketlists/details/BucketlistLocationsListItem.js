import React, { useState } from 'react';
import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import { WrongLocationOutlined } from '@mui/icons-material';
import LocationNotes from './LocationNotes';
import DeleteDialog from '../manage/DeleteDialog';

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

function BucketlistLocationsListItem({ location, markerNum, appState, auth, manageMode }) {

  const { viewport, setViewport, bucketlist, setBucketlist, setLoaderStatus, bucketlists, setBucketlists, setPopup } = appState;

  const [deleteDialog, setDeleteDialog] = useState(false);

  function flyToLocation() {
    setViewport({
      ...viewport,
      longitude: location.destination.lng,
      latitude: location.destination.lat,
      zoom: 6,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    });
    setPopup(location.destination);
  }

  const handleDelete = () => {
    console.log('Deleting...');
    setLoaderStatus(true);
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${bucketlist.id}/destinations/${location.id}`, {
      method: 'DELETE',
      headers: {
        'PIN': bucketlist.pin,
      }
    })
      .then(res => res.json())
      .then(json => {
        setLoaderStatus(false);  
        setBucketlist({
          ...bucketlist,
          bucketlist_destinations: bucketlist.bucketlist_destinations.filter(location => location.id !== json.id)
        })  
        setBucketlists(bucketlists.map(mappedList => {
          if (mappedList.id === bucketlist.id) {
            return {
              ...mappedList,
              bucketlist_destinations: mappedList.bucketlist_destinations.filter(destination => destination.id !== json.id)
            }
          }
          return mappedList;
        }))      
      })
      .catch(err => console.log(err))
  } 

  const handleDeleteConfirm = (e) => {
    e.stopPropagation();
    setDeleteDialog(true);
  }

  return (
    <StyledAccordion onChange={(e, expanded) => { 
      if (expanded) {
        flyToLocation();
      }
     }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <StyledTypography><span>{markerNum}. {location.destination.label}</span> 
        { manageMode && auth ? <DeleteLocationIcon onClick={handleDeleteConfirm} /> : '' }
        </StyledTypography>
      </AccordionSummary>
      <AccordionDetails>
        <LocationNotes manageMode={manageMode} location={location} appState={appState} auth={auth} />
      </AccordionDetails>
      <DeleteDialog label={location.destination.label} deleteDialog={deleteDialog} setDeleteDialog={setDeleteDialog} handleDelete={handleDelete} />
    </StyledAccordion>
  )
}

export default BucketlistLocationsListItem
import React from 'react';
import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';

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

function BucketlistLocationsListItem({ location, markerNum, setViewport, viewport }) {

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

  return (
    <StyledAccordion onMouseEnter={flyToLocation}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{markerNum}. {location.location.label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Notes>{location.notes ? location.notes : 'No notes'}</Notes>
      </AccordionDetails>
    </StyledAccordion>
  )
}

export default BucketlistLocationsListItem
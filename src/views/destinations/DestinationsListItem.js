import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styledComponent from 'styled-components'
import DestinationLike from './DestinationLike';
import { Map } from '@mui/icons-material';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';

const Ul = styledComponent.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;  
`;

const Li = styledComponent.li`
  color: #3d3d3d;
  cursor: pointer;
  &:hover {
    color: #4faadb;
  }
  margin: 5px;
  padding: 0;
`;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StyledCard = styledComponent(Card)`
  // &:hover {
  //   background-color: #d7f2ff;
  // }
`;

const SubHeader = styledComponent.div`
  cursor: pointer;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 10px;
  &:hover {
    color: #4faadb;
  }
`;

const SeenOn = styledComponent.p`
  padding: 0;
  font-size: 0.9em;
  color: #6b6b6b;
  cursor: pointer;
  &:hover {
    color: #02a8ff;
  }
`;

const By = styledComponent.span`
`;

const DestinationsListItem = ({ appState, destination }) => {

  const { viewport, setViewport, setMarkers, setPopup } = appState;

  function flyToLocation() {
    setViewport({
      ...viewport,
      longitude: destination.lng,
      latitude: destination.lat,
      zoom: 6,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    });
    setMarkers([destination]);
    setPopup(destination);
  }

  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const latLong = `${destination.lat}° ${destination.lng}°`;

  return (
    <StyledCard>
      <CardHeader
        title={destination.label}
        subheader={<SubHeader onClick={flyToLocation}><Map />{latLong}</SubHeader>}
      />
      <CardContent>
        <SeenOn onClick={handleExpandClick}>Seen on <b>{destination.bucketlists.length}</b> bucketlists</SeenOn>
      </CardContent>
      <CardActions disableSpacing>
        <DestinationLike destination={destination} appState={appState} /> {destination.likes}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Ul>
            {destination.bucketlists.map(list => {
              return (
                <Li key={list.id} onClick={() => navigate(`/bucketlists/${list.id}`)}>
                  <b>{list.name}</b> <By>by {list.created_by}</By>
                </Li>
              )
            })}
          </Ul>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
}

export default DestinationsListItem;
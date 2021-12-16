import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styledComponent from 'styled-components'
import DestinationLike from './DestinationLike';
import { Map } from '@mui/icons-material';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import { Comment } from '@mui/icons-material';

const Ul = styledComponent.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;  
`;

const Li = styledComponent.li`
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
        <Typography variant="body2" color="text.secondary">
          Seen on <b>{destination.bucketlists.length}</b> bucketlists
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <DestinationLike destination={destination} appState={appState} /> {destination.likes}
        <IconButton aria-label="share">
          <Comment />
        </IconButton>
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
                  {list.name} by {list.created_by}
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
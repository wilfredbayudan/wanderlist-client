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
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styledComponent from 'styled-components'
import DestinationLike from './DestinationLike';

const P = styledComponent.p`
  cursor: pointer;
  &:hover {
    color: #4faadb;
  }
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

const DestinationsListItem = ({ appState, destination }) => {

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
        subheader={latLong}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Seen on <b>{destination.bucketlists.length}</b> bucketlists
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <DestinationLike destination={destination} appState={appState} /> {destination.likes}
        <IconButton aria-label="share">
          <ShareIcon />
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
          {destination.bucketlists.map(list => {
            return (
              <P key={list.id} onClick={() => navigate(`/bucketlists/${list.id}`)}>
                {list.name} by {list.created_by}
              </P>
            )
          })}
        </CardContent>
      </Collapse>
    </StyledCard>
  );
}

export default DestinationsListItem;
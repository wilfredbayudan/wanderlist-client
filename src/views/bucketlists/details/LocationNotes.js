import React from 'react';
import styled from 'styled-components';

const Notes = styled.p`
  font-size: 0.8em;
  padding: 0;
  margin: 0;
`;

const locationNotes = ({ location, bucketlist, setBucketlist }) => {

  return (
    <Notes>
      {location.notes ? location.notes : 'No notes'}
    </Notes>
  )

}

export default locationNotes;
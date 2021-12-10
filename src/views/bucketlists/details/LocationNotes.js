import React, { useState } from 'react';
import styled from 'styled-components';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';

const Notes = styled.p`
  font-size: 0.8em;
  padding: 0;
  margin: 0;
`;

const EditTextField = styled(TextField)`
  background: #ffffff;
`;

const EditIcon = styled(Edit)`
  cursor: pointer;
  font-size: 1em;
  float: right;
  &:hover {
    color: #17b1ff;
  }
`;

const EditButton = styled(LoadingButton)`

`;

const Clear = styled.div`
  clear: both;
`;

const LocationNotes = ({ location, appState, auth }) => {

  const { bucketlist, setBucketlist, bucketlists, setBucketlists } = appState;

  const [editMode, setEditMode] = useState(false);
  const [editInput, setEditInput] = useState(location.notes);
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => {
    setEditMode(!editMode);
  }

  const handleChange = e => {
    setEditInput(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    console.log(editInput);
  }

  const renderEditMode = () => {
    return (
      <form onSubmit={handleSubmit}>
        <EditTextField 
          value={editInput} 
          size="small" 
          onChange={handleChange} 
          inputRef={(input) => input && input.focus()}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          )}
          multiline 
          rows={2} 
          fullWidth/>
          <EditButton type="submit" loading={loading}>Save</EditButton>
      </form>
    )
  }

  const notes = location.notes ? location.notes : 'No notes';

  return (
    <Notes>
      {editMode ? renderEditMode() : notes}
      { auth && !editMode? <><EditIcon onClick={toggleEdit} /><Clear /></> : null  }
    </Notes>
  )

}

export default LocationNotes;
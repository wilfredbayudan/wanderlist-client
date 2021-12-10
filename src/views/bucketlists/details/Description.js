import React, { useState } from 'react';
import styled from 'styled-components';
import { Edit } from '@mui/icons-material';
import { render } from '@testing-library/react';
import { TextField } from '@mui/material';

const DescriptionDiv = styled.div`
  width: 100%;
  padding: 10px 6px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f2f2f2;
  font-size: 0.9em;
`;

const EditIcon = styled(Edit)`
  cursor: pointer;
  font-size: 1em;
  float: right;
  &:hover {
    color: #80bad9;
  }
`;

const Clear = styled.div`
  clear: both;
`;

const EditTextField = styled(TextField)`
  background: #ffffff;
`;

const Description = ({ appState, description, auth }) => {

  const [editMode, setEditMode] = useState(false); 
  const [editInput, setEditInput] = useState(description);

  const toggleEdit = () => {
    setEditMode(!editMode);
  }

  const handleChange = e => {
    setEditInput(e.target.value)
  }

  const renderEditMode = () => {
    return (
      <EditTextField value={editInput} autoFocus size="small" onChange={handleChange} multiline rows={4} fullWidth />
    )
  }

  return (
    <DescriptionDiv>
      {editMode ? renderEditMode() : description}
      {auth && !editMode? <EditIcon onClick={toggleEdit} /> : null}
      <Clear />
    </DescriptionDiv>
  )
}

export default Description;
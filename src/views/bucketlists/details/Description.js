import React, { useState } from 'react';
import styled from 'styled-components';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
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
    color: #17b1ff;
  }
`;

const Clear = styled.div`
  clear: both;
`;

const EditTextField = styled(TextField)`
  background: #ffffff;
`;

const EditButton = styled(LoadingButton)`

`;

const Description = ({ appState, description, auth, manageMode }) => {

  const [editMode, setEditMode] = useState(false); 
  const [editInput, setEditInput] = useState(description);
  const [loading, setLoading] = useState(false);

  const { bucketlist, setBucketlist, bucketlists, setBucketlists } = appState;

  const toggleEdit = () => {
    setEditMode(!editMode);
  }

  const handleChange = e => {
    setEditInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const updatedBucketlist = {
      ...bucketlist,
      description: editInput
    }

    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${bucketlist.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'PIN': bucketlist.pin
      },
      body: JSON.stringify({
        ...updatedBucketlist,
        method: "updateDetails"
      })
    })
      .then(res => res.json())
      .then(json => {
        setBucketlist({
          ...bucketlist,
          description: json.description
        })
        setBucketlists(bucketlists.map(mappedList => {
          if (mappedList.id === bucketlist.id) {
            return {
              ...mappedList,
              description: json.description
            }
          }
          return mappedList;
        }))
        toggleEdit();
        setLoading(false);
      })
      .catch(err => console.log(err))
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
          rows={4} 
          fullWidth/>
          <EditButton type="submit" loading={loading}>Save</EditButton>
      </form>
    )
  }

  return (
    <DescriptionDiv>
      {editMode && manageMode ? renderEditMode() : description}
      {auth && !editMode && manageMode ? <EditIcon onClick={toggleEdit} /> : null}
      <Clear />
    </DescriptionDiv>
  )
}

export default Description;
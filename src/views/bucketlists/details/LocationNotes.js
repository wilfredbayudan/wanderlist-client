import React, { useState } from 'react';
import styled from 'styled-components';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';

const Notes = styled.div`
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

const AddSpan = styled.span`
  cursor: pointer;
`;

const LocationNotes = ({ location, appState, auth, manageMode }) => {

  const { bucketlist, setBucketlist, bucketlists, setBucketlists } = appState;

  const [editMode, setEditMode] = useState(false);
  const [editInput, setEditInput] = useState(location.notes || '');
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
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${bucketlist.id}/destinations/${location.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'PIN': auth
      },
      body: JSON.stringify({notes: editInput})
    })
      .then(res => res.json())
      .then(json => {
        setBucketlist({
          ...bucketlist,
          bucketlist_destinations: bucketlist.bucketlist_destinations.map(mappedDestination => {
            if (mappedDestination.id === location.id) {
              return {
                ...mappedDestination,
                notes: json.notes
              }
            }
            return mappedDestination;
          })
        })
        setBucketlists(bucketlists.map(mappedList => {
          if (mappedList.id === bucketlist.id) {
            return {
              ...mappedList,
              bucketlist_destinations: mappedList.bucketlist_destinations.map(mappedDestination => {
                if (mappedDestination.id === location.id) {
                  return {
                    ...mappedDestination,
                    notes: json.notes
                  }
                }
                return mappedDestination;
              })
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
          rows={2} 
          fullWidth/>
          <EditButton type="submit" loading={loading}>Save</EditButton>
      </form>
    )
  }

  const notes = location.notes ? location.notes : auth ? <AddSpan onClick={toggleEdit}>Add a note</AddSpan> : 'No notes';

  return (
    <Notes>
      {editMode && manageMode ? renderEditMode() : notes}
      {manageMode ? <><EditIcon onClick={toggleEdit} /><Clear /></> : null  }
    </Notes>
  )

}

export default LocationNotes;
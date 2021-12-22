import React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';
import DestinationPopup from './DestinationPopup';

const StyledMap = styled(ReactMapGL)`
  z-index: 0;
`;

const MarkerDiv = styled.div`
  width: 0;
  height: 0;
`;

const MarkerSpan = styled.span`
  display:flex;
  justify-content:center;
  align-items:center;
  box-sizing:border-box;
  width: 30px;
  height: 30px;
  color:#fff;
  background: #9575d5;
  border:solid 2px;
  border-radius: 0 70% 70%;
  box-shadow:0 0 2px #000;
  cursor: pointer;
  transform-origin:0 0;
  transform: rotateZ(-135deg);
`;

const MarkerLabel = styled.b`
  transform: rotateZ(135deg);
`;

const CurrentlyViewing = styled.div`
  position: fixed;
  top: 70px;
  left: 15px;
  background: rgba(255,255,255, 0.85);
  padding: 8px;
  font-size: 0.9em;
`;

function Map({ appState }) {
  
  const { viewport, setViewport, markers, currentLocation, currentList, popup, setPopup } = appState;

  const location = useLocation();

  const renderMarkers = markers.map((coordinates, index) => {

    return (
      <Marker
        key={index}
        latitude={coordinates.lat}
        longitude={coordinates.lng}
      >
        <MarkerDiv onClick={() => setPopup(coordinates)}>
          <MarkerSpan>
            <MarkerLabel>{location.pathname === '/' || location.pathname === '/destinations' ? '' : index + 1}</MarkerLabel>
          </MarkerSpan>
        </MarkerDiv>
      </Marker>
    )
  })

  function renderCurrentLocation() {
    if (currentLocation) {
      return (
        <Marker
          latitude={currentLocation.lat}
          longitude={currentLocation.lng}
        >
          <MarkerDiv>
            <MarkerSpan style={{ backgroundColor: '#ff9f2d'}}></MarkerSpan>
          </MarkerDiv>
        </Marker>
      )
    }
  }

  function renderCurrentList() {
    if (currentList) {
      return (
        <CurrentlyViewing>
          <b>{currentList.name}</b> by {currentList.created_by}
        </CurrentlyViewing>
      )
    }
  }

  function renderPopup() {

    if (popup) {
      return (
        <Popup
          latitude={popup.lat}
          longitude={popup.lng}
          closeButton={true}
          closeOnClick={true}
          onClose={() => setPopup(false)}
          anchor="top" >
          <DestinationPopup id={popup.id} appState={appState} />
        </Popup>
      )
    }
  }

  return (
    <StyledMap
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      width="100%"
      height="100vh"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {renderCurrentList()}
      {renderMarkers}
      {renderPopup()}
      {renderCurrentLocation()}
    </StyledMap>
  );
}

export default Map;
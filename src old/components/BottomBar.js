import React from 'react';
import styled from 'styled-components';
import MyLocation from '@mui/icons-material/MyLocation';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';

const Footer = styled.footer`
  z-index: 2;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #393939;
  color: #bababa;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const Copyright = styled.div`
  color: #ffffff;
`;

const Coordinates = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #a5a5a5;
`;

const Label = styled.span`
  font-weight: bold;
  margin-left: 15px;
`;

const MyLocationButton = styled(MyLocation)`
  color: #7fead2;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    color: #a1ffea;
  }
`

const BottomBar = ({ viewport, setViewport, setLoaderStatus, setCurrentLocation }) => {

  function getLocation() {
    if (navigator.geolocation) {
      setLoaderStatus('Fetching location');
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
    }
  }
  
  function showPosition(position) {
    setLoaderStatus(false);
    setViewport({
      ...viewport,
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
      zoom: 4,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    });
    setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
  }

  return (
    <Footer>
      <Copyright>
        &copy; 2021 WanderList
      </Copyright>
      <Coordinates>
        <Label>Latitude:</Label> {viewport.latitude.toFixed(6)} 
        <Label>Longitude:</Label> {viewport.longitude.toFixed(6)} 
        <Label>Zoom:</Label> {viewport.zoom.toFixed(2)}
        <MyLocationButton onClick={getLocation} />
      </Coordinates>
    </Footer>
  )
};

export default BottomBar;
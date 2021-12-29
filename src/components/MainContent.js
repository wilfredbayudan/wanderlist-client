import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Main = styled.main`
  display: block;
  z-index: 1;
  background-color: #ffffff;
  width: 400px;
  position: fixed;
  right: 0;
  height: 100vh;
  padding-top: 60px;
  padding-bottom: 50px;
  overflow: scroll;
  transition-duration: 500ms; 
  transition-timing-function: ease; 
  margin-right: ${props => props.displayContent ? "0" : "-395px"};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  @media (max-width: 768px) {
    width: 90%;
    background-color: rgba(255, 255, 255, 0.96);
    margin-right: ${props => props.displayContent ? "0" : "-85%"};
    padding-bottom: 150px;
  }
`;

const VisibilityDiv = styled.div`
  position: fixed;
  right: 5px;
  top: 60px;
  z-index: 10;
  color: #000000;
  cursor: pointer;
  transition-duration: 500ms; 
  transition-timing-function: ease; 
  margin-right: ${props => props.displayContent ? "400px" : "5px"};;
  opacity: 40%;
  &:hover {
    opacity: 80%;
    color: #ffffff;
  }
  @media (max-width: 768px) {
    margin-right: ${props => props.displayContent ? "90%" : "5%"};
  }
`;

const MainContent = ({ children, displayContent, setDisplayContent }) => {

  const locationPath = useLocation().pathname;

  const renderVisibilityToggle = () => {
    if (displayContent) {
      return <VisibilityOff onClick={() => setDisplayContent(false)} />
    } else {
      return <Visibility onClick={() => setDisplayContent(true)} />
    }
  }

  return (
    <>
      {
        locationPath !== "/" ?
          <VisibilityDiv displayContent={displayContent}>
            {renderVisibilityToggle()}
          </VisibilityDiv>
        : null
      }
      <Main displayContent={displayContent} >
        {children}
      </Main>
    </>
  );
};

export default MainContent;
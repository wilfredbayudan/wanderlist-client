import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import WanderlistLogo from '../assets/images/logo.png';

const StyledHeader = styled.header`
  z-index: 2;
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  color: #393939;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;

const Logo = styled.img`
  height: 100%;
`;

const NavBar = styled.div`
  font-size: 1.25em;
  text-transform: uppercase;
`;

const StyledNavLink = styled(NavLink)`
  color: #535252;
  text-decoration: none;
  margin-right: 10px;
  margin-left: 10px;
  padding: 8px 0 8px 0;
  transition-duration: 300ms; 
  transition-timing-function: ease; 
  border-bottom: 3px solid #ffffff;
  &:hover, &.active {
    color: #75e0c8;
    border-bottom: 3px solid #61e7ec;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo src={WanderlistLogo} />
      <NavBar>
        <StyledNavLink to="/">Bucketlists</StyledNavLink> | 
        <StyledNavLink to="/destinations">Destinations</StyledNavLink> |
        <StyledNavLink to="/bucketlists/new">Create A List</StyledNavLink>
      </NavBar>
    </StyledHeader>
  );
}

export default Header;
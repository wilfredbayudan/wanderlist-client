import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import WanderlistLogo from '../assets/images/logo.png';
import MobileNav from './MobileNav';

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
  cursor: pointer;
`;

const NavBar = styled.div`
  font-size: 1.25em;
  text-transform: uppercase;
  @media (max-width: 820px) {
    display: none;
  }
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

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <StyledHeader>
      <Logo src={WanderlistLogo} onClick={handleLogoClick} />
      <NavBar>
        <StyledNavLink to="/bucketlists">Bucketlists</StyledNavLink> | 
        <StyledNavLink to="/destinations">Destinations</StyledNavLink> |
        <StyledNavLink to="/bucketlists/new">Create A List</StyledNavLink>
      </NavBar>
      <MobileNav />
    </StyledHeader>
  );
}

export default Header;
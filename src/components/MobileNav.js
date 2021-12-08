import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MenuOutlined } from '@mui/icons-material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ListAltOutlined } from '@mui/icons-material';
import { LocationOnOutlined } from '@mui/icons-material';
import { EditLocationAltOutlined } from '@mui/icons-material';

const MenuIcon = styled(MenuOutlined)`
  cursor: pointer;
`;

const ResponsiveNav = styled.div`
  display: block;
  @media (min-width: 820px ) {
    display: none;
  }
`;

const MobileNav = () => {

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    setIsOpen(open);
  }

  return (
    <ResponsiveNav>
      <MenuIcon onClick={toggleDrawer(true)} />
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <List>
          <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={() => navigate(`/bucketlists`)}>
              <ListItemIcon>
                <ListAltOutlined />
              </ListItemIcon>
              <ListItemText primary="Bucketlists" />
            </ListItem>
            <ListItem button onClick={() => navigate(`/destinations`)}>
              <ListItemIcon>
                <LocationOnOutlined />
              </ListItemIcon>
              <ListItemText primary="Destinations" />
            </ListItem>
            <ListItem button onClick={() => navigate(`/bucketlists/new`)}>
              <ListItemIcon>
                <EditLocationAltOutlined />
              </ListItemIcon>
              <ListItemText primary="Create a List" />
            </ListItem>
          </List>
        </Box>
        </List>
      </Drawer>
    </ResponsiveNav>
  );

}

export default MobileNav;
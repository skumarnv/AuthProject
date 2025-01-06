import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from '@mui/material';
import {
  Home,
  People,

  Menu as MenuIcon,
  Logout,
} from '@mui/icons-material';
import HomePage from './Home';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 260;

const SideDrawer = () => {
  const [open, setOpen] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState('home');
    const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item); 
  
  };
  const renderContent = () => {
    switch (selectedItem) {
      case 'home':
        return <HomePage/>;
        
      default:
        return <Typography variant="h4">Select an Option</Typography>;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Top AppBar */}
      <AppBar position="fixed" style={{ zIndex: 1300, backgroundColor: '#fff', color: '#000' }}>
        <Toolbar>
          <IconButton edge="start"
          //  onClick={toggleDrawer} 
           color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {/* Your title or logo here */}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%',padding:'10px',pt:'5px' }}>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
              {/* Your username or header */}
            </Typography>
            <Typography variant="subtitle1">Projects</Typography>
          </div>
          <Divider />
          <Typography variant="h6" style={{ padding: '16px' ,paddingBottom:"0px", paddingTop:'30px',fontWeight:'bold',fontSize:'16px'}}>
          Home
        </Typography>

          <List sx={{ padding:1}}>
            <ListItem
              button
              selected={selectedItem === 'home'} // Check if this item is selected
              onClick={() => handleItemClick('home')}
              sx={{
                mb:.5,
                borderRadius:'7px',
                backgroundColor: selectedItem === 'home' ? '#e0e0e0' : 'transparent', // Apply selected color
              }}
            >
              <ListItemIcon>
                <Home sx={{ color: selectedItem === 'home' ? 'blue' : 'black' }} />
              </ListItemIcon>
              <ListItemText sx={{color:selectedItem === 'home' ? 'blue' : 'black' }} primary="Home" />
            </ListItem>

            {/* <ListItem
              button
              selected={selectedItem === 'employee'}
              onClick={() => handleItemClick('employee')}
              sx={{
                mb:.5,
                borderRadius:'7px',
                backgroundColor: selectedItem === 'employee' ? '#e0e0e0' : 'transparent',
              }}
            >
              <ListItemIcon>
                <People sx={{ color: selectedItem === 'employee' ? 'blue' : 'black' }} />
              </ListItemIcon>
              <ListItemText sx={{color:selectedItem === 'employee' ? 'blue' : 'black' }} primary="Employee" />
            </ListItem> */}

            
          </List>

          <Box sx={{ flexGrow: 1 }} />
          <List sx={{  padding:1 ,mb:.5}}>
            <ListItem selected={true} sx={{borderRadius:'7px'}} button onClick={() => {   navigate("/")  }}>
              <ListItemIcon >
                <Logout sx={{ fontSize:20,color: 'black' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>

          <Divider />
        </Box>
      </Drawer>

      {/* Main Content */}
      <main style={{ flexGrow: 1, padding: '24px', }}>
        <Toolbar />
        {renderContent()}
      </main>
    </div>
  );
};

export default SideDrawer;

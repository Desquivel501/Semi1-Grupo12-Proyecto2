import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import logo from '../../assets/logo_white.png';

import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import SmartToyIcon from '@mui/icons-material/SmartToy';

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

const borderSettings = '3px solid white'



function CustomAppBar() {

  const location = useLocation();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [selected, setSelected] = useState(0);

  return (
    <AppBar position="fixed" sx={{ bgcolor:'#0a1a42'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Box 
            component="img"
            sx={{ 
              height: 45,
              mr: 1,
              maxWidth: 160,
              cursor: 'pointer',
            }}
            alt="logo"
            src={logo}
            onClick={() => navigate('/')}
          />

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>

              <Box sx={{ borderBottom: location.pathname == '/' ? borderSettings : "", my: 2, px:3 }}>
                <Tooltip title="Home">
                  <IconButton
                    aria-label="Home" 
                    onClick={() => navigate('/')}
                    sx={{ color: 'white', display: 'block', }}
                  >
                    <HomeIcon fontSize='large'/>
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={{ borderBottom: location.pathname == '/friends' ? borderSettings : "", my: 2, px:3 }}>
                <Tooltip title="Friends">
                  <IconButton
                    aria-label="Friends" 
                    onClick={() => navigate('/friends')}
                    sx={{ color: 'white', display: 'block', }}
                  >
                    <PeopleIcon fontSize='large'/>
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={{ borderBottom: location.pathname == '/chat' ? borderSettings : "", my: 2, px:3 }}>
                <Tooltip title="Chat">
                  <IconButton
                    aria-label="Chat" 
                    onClick={() => navigate('/chat')}
                    sx={{ color: 'white', display: 'block', }}
                  >
                    <ChatIcon fontSize='large'/>
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={{ borderBottom: location.pathname == '/chatbot' ? borderSettings : "", my: 2, px:3 }}>
                <Tooltip title="ChatBot">
                  <IconButton
                    aria-label="ChatBot" 
                    onClick={() => navigate('/chatbot')}
                    sx={{ color: 'white', display: 'block', }}
                  >
                    <SmartToyIcon fontSize='large'/>
                  </IconButton>
                </Tooltip>
              </Box>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="My Profile">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Profile" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default CustomAppBar;

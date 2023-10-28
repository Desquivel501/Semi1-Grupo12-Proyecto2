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
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

import { signOut } from "../../auth/auth";

const borderSettings = '3px solid white'

import Swal from 'sweetalert2';

function CustomAppBar() {

  const location = useLocation();
  const navigate = useNavigate();

  function logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0a1a42',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Sesión cerrada',
          'Tu sesión ha sido cerrada correctamente',
          'success'
        )
        signOut()

        Swal.fire({
            icon: 'success',
            title: 'Se ha cerrado la sesion',
            showConfirmButton: false,
        }).then(() => {
            navigate('/')
        })

      }
    })
  }

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor:'#0a1a42',
        display: location.pathname == '/login' || location.pathname == '/signup' || location.pathname == '/' ? 'none' : 'block',
      }}>
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

                <Box sx={{ borderBottom: location.pathname == '/home' ? borderSettings : "", my: 2, px:3 }}>
                  <Tooltip title="Home">
                    <IconButton
                      aria-label="Home" 
                      onClick={() => navigate('/home')}
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

                <Box sx={{ borderBottom: location.pathname == '/add_friends' ? borderSettings : "", my: 2, px:3 }}>
                  <Tooltip title="Add Friends">
                    <IconButton
                      aria-label="Add Friends" 
                      onClick={() => navigate('/add_friends')}
                      sx={{ color: 'white', display: 'block', }}
                    >
                      <PersonAddIcon fontSize='large'/>
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

            <Box sx={{ my: 2, px:3 }}>
              <Tooltip title="Cerrar Sesión">
                <IconButton sx={{ color: 'white', display: 'block', }} onClick={() => logout()}>
                  <LoginIcon fontSize='large'/>
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="My Profile">
                <IconButton sx={{ p: 0 }}
                onClick ={() => navigate('/perfil')}>
                  <Avatar alt="Profile" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <AppBar position="fixed" sx={{ bgcolor:'#0a1a42',
        display: location.pathname == '/login' || location.pathname == '/signup' || location.pathname == '/' ? 'block' : 'none',
      }}>
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

                <Box sx={{ borderBottom: location.pathname == '/login' ? borderSettings : "", my: 2, px:3 }}>
                  <Tooltip title="Login">
                    <IconButton
                      aria-label="Login" 
                      onClick={() => navigate('/login')}
                      sx={{ color: 'white', display: 'block', }}
                    >
                      <LoginIcon fontSize='large'/>
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box sx={{ borderBottom: location.pathname == '/signup' ? borderSettings : "", my: 2, px:3 }}>
                  <Tooltip title="SignUp">
                    <IconButton
                      aria-label="SignUp" 
                      onClick={() => navigate('/signup')}
                      sx={{ color: 'white', display: 'block', }}
                    >
                      <AppRegistrationIcon fontSize='large'/>
                    </IconButton>
                  </Tooltip>
                </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
  ;
}
export default CustomAppBar;

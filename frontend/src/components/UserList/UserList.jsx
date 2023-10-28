
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { 
    Grid,
    Paper,
    Box,
    Button,
    Typography,
    Avatar
} from '@mui/material';

import User from '../User/User';

function UserList(props) {

    const { solicitudes=false, users=[], friends=false } = props

    return (
        <Grid 
            // container
            item
            height="80vh"
            width={friends ? '100%' : '70%'}
            xs={6}  
            sx={{ mt:2, pb:3, borderRadius: 3, px: 3, backgroundColor: '#38393a', mx:1 }}  
            component={Paper} 
            justifyContent='center'
            
        >
            <Typography
                variant="h5"
                sx={{ textAlign: 'left', mt: 2, pt:3, color: '#ffffff'}}
            >
                {solicitudes ? 'Mis solicitudes de amistad' : friends ? 'Mis amigos' : 'Usuarios'}
            </Typography>

            <Box
                overflow={'auto'}
                height="90%"
                sx={{ pr: 1.5}}
            >
                {
                    users.map((user, i) => (
                        <User
                            key={i}
                            dpi={user.dpi}
                            email={user.email}
                            nombre={user.name + ' ' + user.family_name}
                            foto={user.image}
                            solicitudes={solicitudes}
                            friends={friends}
                        />
                    ))
                }
            </Box>
            
            
            
        </Grid>
    )
}

export default UserList
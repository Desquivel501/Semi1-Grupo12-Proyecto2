
import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
    Grid,
    Paper,
    Box,
    Button,
    Typography,
    Avatar
} from '@mui/material';

function UserChatList({friends, selectFriend}) {

    return (
        <Grid 
             
            xs={4}  
            sx={{ width: "100%", height: '100%', mt:2, pb:3, borderRadius: 3, px: 3, mx:1 ,backgroundColor: '#38393a' }}  
            component={Paper} 
            justifyContent='center'
            overflow={'auto'}
        >
            <Typography
                variant="h5"
                sx={{ textAlign: 'left', mt: 2, pt:3, color: '#ffffff'}}
            >
                Amigos
            </Typography>

            <Grid
                overflow={'auto'}
            >
            {
                friends.map((user, i) => (
                    <Grid
                        key={i}
                        container
                        direction="row"
                        justifyContent="left"
                        alignItems="center"
                        sx={{ border: 0, my: 1, backgroundColor: "#737475", borderRadius: 3, py:1, pl:1, cursor:'pointer' }}
                    >
                        <Grid item display='flex' xs={2} sx={{ border: 0 }} justifyContent='center'>
                            <Box
                                component="img"
                                sx={{ 
                                    maxWidth: '80%',
                                    borderRadius: '50%', 
                                }}
                                alt="logo"
                                src={user.image}
                            />
                        </Grid>
                        
                        <Grid item xs={7} sx={{ border: 0, pl:1 }}>
                            
                            <Typography
                                onClick={()=>selectFriend(user)}
                                variant="h5"
                                sx={{ textAlign: 'left', color: '#ffffff'}}
                            >
                                {user.name+" "+user.family_name}
                            </Typography>

                        </Grid>

                    </Grid>
                ))
            }
            </Grid>
            
        </Grid>
    )
}

export default UserChatList

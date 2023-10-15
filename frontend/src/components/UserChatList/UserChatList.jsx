
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

const users = [
    {
        id: 1,
        nombre: 'John Smith',
        foto: 'https://www.rainforest-alliance.org/wp-content/uploads/2021/06/three-toed-sloth-teaser-1-600x600.jpg.optimal.jpg'
    },
    {
        id: 2,
        nombre: 'Mary Smith',
        foto: 'https://pbs.twimg.com/profile_images/521554275713830913/TBY5IslL_400x400.jpeg'
    },
    {
        id: 3,
        nombre: 'Luis Smith',
        foto: 'https://people.com/thmb/WxJfkZ3MCkXFhY1GgWzuJLqDgDc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(1019x626:1021x628)/dog-dating-2522ccf2b0e04f94a29f25fdb81d79af.jpg'
    },
    {
        id: 4,
        nombre: 'Jane Smith',
        foto: 'https://natusan.co.uk/cdn/shop/articles/natusan-blog-how-cat-years-work-header_600x600_crop_center.jpg?v=1674474680'
    }
]

function UserChatList() {

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
                users.map((user, i) => (
                    <Grid
                        key={i}
                        container
                        direction="row"
                        justifyContent="left"
                        alignItems="center"
                        sx={{ border: 0, my: 1, backgroundColor: "#737475", borderRadius: 3, py:1, pl:1 }}
                    >
                        <Grid item display='flex' xs={2} sx={{ border: 0 }} justifyContent='center'>
                            <Box
                                component="img"
                                sx={{ 
                                    maxWidth: '80%',
                                    borderRadius: '50%', 
                                }}
                                alt="logo"
                                src={user.foto}
                            />
                        </Grid>
                        
                        <Grid item xs={7} sx={{ border: 0, pl:1 }}>
                            
                            <Typography
                                variant="h5"
                                sx={{ textAlign: 'left', color: '#ffffff'}}
                            >
                                {user.nombre}
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
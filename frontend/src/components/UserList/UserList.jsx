
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

import Comment from '../Comment/Comment';
import User from '../User/User';

const loremIpsum  = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non felis a elit egestas dictum id eget diam. Aenean nisi est, malesuada quis molestie nec, auctor id tortor. Proin vel diam id quam lacinia molestie. Sed elementum hendrerit nisi nec volutpat. Sed elementum, orci nec consequat hendrerit, erat elit vestibulum eros, a hendrerit urna tellus vel ex. Quisque pretium, orci nec rhoncus fermentum, justo lorem tincidunt turpis, sed pretium libero odio et nisl. Etiam ultricies massa eu tristique sodales. Suspendisse feugiat quis magna vel condimentum. Nulla consectetur fermentum pharetra. Quisque egestas libero aliquam, semper tellus sed, cursus leo. Vestibulum vel neque commodo, mattis sem a, viverra lacus. Cras sit amet vestibulum velit, et mattis odio. Nam nec malesuada odio. Praesent quam velit, mollis fringilla imperdiet eget, viverra non ipsum. In at ante mattis, vulputate nulla vitae, aliquet turpis. Donec lacinia mattis est, sit amet dictum tellus ultrices et. '

const labels = ['Landscape', 'Photography', 'Nature', 'Sunset', 'Green']

const users = [
    {
        id: 1,
        nombre: 'John Smith',
        comentario: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec lorem leo.',
        foto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    {
        id: 2,
        nombre: 'Mary Smith',
        comentario: 'Praesent cursus vulputate varius. Aenean porttitor eros a turpis rutrum pretium.',
        foto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    {
        id: 3,
        nombre: 'Luis Smith',
        comentario: 'Nulla ac sapien vel nulla elementum fermentum ac in est.',
        foto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    {
        id: 4,
        nombre: 'Jane Smith',
        comentario: 'Sed suscipit hendrerit risus, eget feugiat lectus ornare eu. Suspendisse tempus vel ex id imperdiet.',
        foto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    }
]

function UserList() {

    return (
        <Grid 
            // container
            height="80vh"
            width="60%"
            xs={12}  
            sx={{ mt:2, pb:3, borderRadius: 3, px: 3, backgroundColor: '#38393a' }}  
            component={Paper} 
            justifyContent='center'
            overflow={'auto'}
        >
            <Typography
                variant="h5"
                sx={{ textAlign: 'left', mt: 2, pt:3, color: '#ffffff'}}
            >
                Usuarios
            </Typography>
            
            {
                users.map((user) => (
                    <User
                        key={user.id}
                        nombre={user.nombre}
                        foto={user.foto}
                    />
                ))
            }
            
        </Grid>
    )
}

export default UserList
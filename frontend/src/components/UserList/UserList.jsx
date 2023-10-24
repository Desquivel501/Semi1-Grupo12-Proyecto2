
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

import { AuthContext } from "../../auth/authProvider";

import { getCurrentUser } from '../../auth/auth';

import { getData } from '../../api/api';

// const users = [
//     {
//         id: 1,
//         nombre: 'John Smith',
//         comentario: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec lorem leo.',
//         foto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
//     },
//     {
//         id: 2,
//         nombre: 'Mary Smith',
//         comentario: 'Praesent cursus vulputate varius. Aenean porttitor eros a turpis rutrum pretium.',
//         foto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
//     },
//     {
//         id: 3,
//         nombre: 'Luis Smith',
//         comentario: 'Nulla ac sapien vel nulla elementum fermentum ac in est.',
//         foto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
//     },
//     {
//         id: 4,
//         nombre: 'Jane Smith',
//         comentario: 'Sed suscipit hendrerit risus, eget feugiat lectus ornare eu. Suspendisse tempus vel ex id imperdiet.',
//         foto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
//     },
    
// ]

function UserList(props) {

    const { solicitudes=false, users=[] } = props

    // const { user} = useContext(AuthContext);

    // const [users, setUsers] = useState([])

    // useEffect(() => {
    //     const getUsers = async () => {
    //         const user = await getCurrentUser()
            
    //         const endpoint = `/friends/not/${user.email}`

    //         const res = await getData({endpoint})

    //         console.log(res)

    //     }
    //     getUsers()
    // }, [])

    return (
        <Grid 
            // container
            item
            height="80vh"
            width="60%"
            xs={6}  
            sx={{ mt:2, pb:3, borderRadius: 3, px: 3, backgroundColor: '#38393a', mx:1 }}  
            component={Paper} 
            justifyContent='center'
            
        >
            <Typography
                variant="h5"
                sx={{ textAlign: 'left', mt: 2, pt:3, color: '#ffffff'}}
            >
                {solicitudes ? 'Mis solicitudes de amistad' : 'Usuarios'}
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
                            nombre={user.name + ' ' + user.lastname}
                            foto={user.photo}
                            solicitudes={solicitudes}
                        />
                    ))
                }
            </Box>
            
            
            
        </Grid>
    )
}

export default UserList
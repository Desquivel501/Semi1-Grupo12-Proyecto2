
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { 
    Grid,
    Paper,
    Box,
    Button,
    Typography,
    Avatar, 
} from '@mui/material';

import { AuthContext } from "../../auth/authProvider";

import { getCurrentUser } from '../../auth/auth';

function User(props) {

    const { nombre, foto, solicitudes } = props

    const [user, setUser] = useState(null)


    return (
        <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="center"
            sx={{ border: 0, my: 1, backgroundColor: "#737475", borderRadius: 3, py:1 }}
        >
            <Grid item display='flex' xs={1} sx={{ border: 0, mr:2 }} justifyContent='center'>
                <Box
                    component="img"
                    sx={{ 
                        maxWidth: '70%',
                        borderRadius: '50%',  
                    }}
                    alt="logo"
                    src={foto}
                />
            </Grid>
            
            <Grid item xs={6} sx={{ border: 0 }}>
                
                <Typography
                    variant="h5"
                    sx={{ textAlign: 'left', color: '#ffffff'}}
                >
                    {nombre}
                </Typography>

            </Grid>

            <Grid item display='flex' xs={4} sx={{ border: 0}} justifyContent="center">

                {/* {solicitudes ? 'Aceptar Solicitud' : ''} */}

                {
                    solicitudes ? 
                    <>
                        <Button
                            variant="contained"
                            sx={{ textAlign: 'left', color: '#ffffff', backgroundColor: '#1f6d10', mx:1}}
                        >
                            Aceptar
                        </Button>

                        <Button
                            variant="contained"
                            sx={{ textAlign: 'left', color: '#ffffff', backgroundColor: '#9e1718'}}
                        >
                            Rechazar
                        </Button>
                    </>
                    :
                    <Button
                        variant="contained"
                        sx={{ textAlign: 'left', color: '#ffffff', backgroundColor: solicitudes ? '#1f6d10' : '#1976d2'}}
                    >
                        Enviar Solicitud
                    </Button>
                }
                
                

            </Grid>

        </Grid>
    )
}

export default User
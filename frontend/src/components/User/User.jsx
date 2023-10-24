
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

import { postData } from '../../api/api';

import { getCurrentUser } from '../../auth/auth';

import { AuthContext } from "../../auth/authProvider";

import Swal from 'sweetalert2';

function User(props) {

    const { nombre, foto, solicitudes = false, dpi, email } = props

    const { user} = useContext(AuthContext);
    const [disabled, setDisabled] = useState(false)
    const [aceptada, setAceptada] = useState(0)


    const enviarSolicitud = async () => {

        const endpoint = '/friends/addFriend'

        const data = {
            email: user.email,
            friend: email
        }

        console.log(data)

        const res = await postData({endpoint, data})
        console.log(res)

        if(res.TYPE == 'SUCCESS'){
            Swal.fire({
                icon: 'success',
                title: 'Solicitud enviada',
                showConfirmButton: false
            })
            setDisabled(true)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo enviar la solicitud',
                showConfirmButton: false
            })
        }
    }

    const aceptarSolicitud = async () => {
        const endpoint = '/friends/acceptFriend'

        const data = {
            email: user.email,
            friend: email
        }

        console.log(data)

        const res = await postData({endpoint, data})
        console.log(res)

        if(res.TYPE == 'SUCCESS'){
            Swal.fire({
                icon: 'success',
                title: 'Solicitud aceptada',
                showConfirmButton: false
            })
            setDisabled(true)
            setAceptada(1)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo aceptar la solicitud',
                showConfirmButton: false
            })
        }
    }

    const rechazarSolicitud = async () => {
        const endpoint = '/friends/declineFriend'

        const data = {
            email: user.email,
            friend: email
        }

        console.log(data)

        const res = await postData({endpoint, data})
        console.log(res)

        if(res.TYPE == 'SUCCESS'){
            Swal.fire({
                icon: 'success',
                title: 'Solicitud rechazada',
                showConfirmButton: false
            })
            setDisabled(true)
            setAceptada(2)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo rechazar la solicitud',
                showConfirmButton: false
            })
        }
    }


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
                        aceptada == 0 ? 
                            <>
                                <Button
                                    variant="contained"
                                    disabled={disabled}
                                    sx={{ textAlign: 'left', color: '#ffffff', backgroundColor: '#1f6d10', mx:1}}
                                    onClick={aceptarSolicitud}
                                >
                                    Aceptar
                                </Button>

                                <Button
                                    variant="contained"
                                    disabled={disabled}
                                    sx={{ textAlign: 'left', color: '#ffffff', backgroundColor: '#9e1718'}}
                                    onClick={rechazarSolicitud}
                                >
                                    Rechazar
                                </Button>
                            </>
                            :
                                aceptada == 1 ?
                                    <Button
                                        variant="contained"
                                        disabled={disabled}
                                        sx={{ textAlign: 'left', color: '#ffffff', backgroundColor: '#1f6d10'}}
                                    >
                                        Amigos!
                                    </Button>
                                :
                                    <Button
                                        variant="contained"
                                        disabled={disabled}
                                        sx={{ textAlign: 'left', color: '#ffffff', backgroundColor: '#9e1718'}}
                                    >
                                        Rechazado
                                    </Button>
                    :
                    <Button
                        variant="contained"
                        disabled={disabled}
                        sx={{ textAlign: 'left', color: '#ffffff', backgroundColor: solicitudes ? '#1f6d10' : '#1976d2'}}
                        onClick={enviarSolicitud}
                    >
                        {disabled ? 'Solicitud enviada' : 'Enviar solicitud'}
                    </Button>
                }
                
                

            </Grid>

        </Grid>
    )
}

export default User
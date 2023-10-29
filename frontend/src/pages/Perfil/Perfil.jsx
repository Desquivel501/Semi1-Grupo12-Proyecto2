import React, { Component } from 'react';
import { Button, TextField, CssBaseline, Typography, Box, Modal } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alpha, styled } from '@mui/material/styles';
import './Perfil.css';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, getCurrentUser } from '../../auth/auth';

import Swal from 'sweetalert2'

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#fff',
    },
    '& label': {
        color: '#fff',
    },

    '& .MuiInput-underline:after': {
        borderBottomColor: '#fff',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#fff',
        },
        '&:hover fieldset': {
            borderColor: '#fff',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fff',
        },
    },
});

export default function Perfil() {

    const navigate = useNavigate();
    //const { logout, login } = useContext(sesionContext);

    const [state, setState] = useState({
        nombre: '',
        nombretemp: '',
        apellido: '',
        apellidotemp: '',
        dpi: '',
        dpitmp: '',
        correo: '',
        foto: 'https://ih0.redbubble.net/image.1046392278.3346/raf,360x360,075,t,fafafa:ca443f4786.jpg',
        contrasena: '',
        nueva_contrasena: '',
        verificar_contrasena: '',
        preview: 'https://ih0.redbubble.net/image.1046392278.3346/raf,360x360,075,t,fafafa:ca443f4786.jpg',
        color: '#7f7f7f'
    })
    const [count, setCount] = useState(0);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setOpen2] = useState(false);

    const close_contrasena = (e) => {
        setState({ ...state, contrasena: '', nueva_contrasena: '', verificar_contrasena: '' })
        setOpen2(false)
    }

    useEffect(() => {
        const start = async () => {
            try {
                const user = await getCurrentUser()
                if (user === null) {
                    navigate('/')
                }

                console.log(user['custom:dpi'])

                setState({
                    ...state,
                    nombre: user.name,
                    nombretemp: user.name,
                    apellido: user.family_name,
                    apellidotemp: user.family_name,
                    dpi: user['custom:dpi'],
                    dpitmp: user['custom:dpi'],
                    foto: user.picture,
                    preview: user.picture,
                    correo: user.email,
                })

                console.log(user)

            } catch (err) {
                // not logged in
                console.log(err)
                navigate('/')
            }
        }
        start()
    }, [])

    const updateData = async () => {

    }


    return (
        <>
            <Box
                component="form"
                sx={{ width: '100%' }}

            >
                <section className="vh-170">
                    <div className="container pb-3 h-80" style={{ maxWidth: '100%' }}>
                        <div className="row d-flex justify-content-center align-items-center h-50">
                            <div className="col col-lg-12 mb-4 mb-lg-0">
                                <div className="card mb-3" style={{ borderRadius: '.5rem', backgroundColor: '#1f1f1f' }}>
                                    <div className="row g-0" style={{ justifyContent: 'center' }}>

                                        <div className="col-md-12 text-center text-white pb-4"
                                            style={{ borderTopLeftRadius: '.3rem', borderBottomLeftRadius: '.3rem', backgroundColor: '#223054' }}>
                                            <img src={state.foto}
                                                alt="Avatar" className="img-fluid my-5"
                                                style={{
                                                    width: '105px', border: 0, borderColor: '#000',
                                                    boxShadow: '4px 4px 10px #000000',
                                                    margin: '2em',
                                                    borderRadius: '30%',
                                                }}
                                                onLoad={() => setCount(count + 1)}
                                            />
                                            <h2 style={{ color: '#fff' }}>{state.nombre + ' ' + state.apellido}</h2>
                                        </div>

                                        <div className="col-md-10">
                                            <div className="row d-flex p-4">
                                                <div className="row pt-1 pb-1">
                                                    <h3 style={{ color: '#fff' }}>Actualizar mis datos</h3>
                                                </div>
                                                
                                                <div className="row pt-1" style={{ justifyContent: 'center' }}>

                                                    <div className="container">
                                                        <div className="row justify-content-center">
                                                            <div className="col-12 col-lg-10 col-xl-8 mx-auto">
                                                                <div className="my-4">
                                                                    <form>
                                                                        <hr className="my-4" />
                                                                        <div className="form-row">
                                                                            <div className="form-group col-md-6">
                                                                                <label style={{ color: '#fff' }}>Nombre</label>
                                                                                <input type="text" id="firstname" className="form-control"  value={state.nombretemp} onChange={(e) => setState({ ...state, nombretemp: e.target.value })} />
                                                                            </div>
                                                                            <div className="form-group col-md-6">
                                                                                <label style={{ color: '#fff' }}>Apellido</label>
                                                                                <input type="text" id="lastname" className="form-control" value={state.apellidotemp}  onChange={(e) => setState({ ...state, apellidotemp: e.target.value })} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label style={{ color: '#fff' }}>DPI</label>
                                                                            <input type="number" className="form-control" id="inputEmail4" value={state.dpitmp}  onChange={(e) => setState({ ...state, dpitmp: e.target.value })} />
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1" style={{ justifyContent: 'center' }}>

                                                    <div className="col-7 mb-3">
                                                        <h5 style={{ color: '#fff' }}>Actualizar Foto de Perfil</h5>
                                                        
                                                        <Button className="button my-3" onClick={handleOpen}
                                                            sx={{
                                                                background: '#7f7f7f',
                                                                color: '#fff',
                                                                "&:hover": {
                                                                    background: '#4c4c4c',
                                                                }
                                                            }}
                                                        >
                                                            Cambiar
                                                        </Button>

                                                    </div>
                                                    <hr className="mt-0 mb-2" />
                                                    <div className="col-7 mb-3">
                                                        <Button
                                                            onClick={() => setOpen2(true)}
                                                            className="button my-3"
                                                            sx={{
                                                                mx: 1,
                                                                background: '#7f7f7f',
                                                                color: '#fff',
                                                                "&:hover": {
                                                                    background: '#4c4c4c',
                                                                }
                                                            }}
                                                        >
                                                            Actualizar Datos
                                                        </Button>

                                                        <Button className="button my-3"
                                                            onClick={() => {
                                                                Swal.fire({
                                                                    title: '¿Estas seguro?',
                                                                    text: "Se cerrará la sesión actual",
                                                                    icon: 'warning',
                                                                    showCancelButton: true,
                                                                    confirmButtonColor: '#9d0000',
                                                                    cancelButtonColor: '#717171',
                                                                    confirmButtonText: 'Cerrar Sesión',
                                                                    cancelButtonText: 'Cancelar'
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        // logout();
                                                                        // navigate("/");
                                                                    }
                                                                })
                                                            }
                                                            }
                                                            sx={{
                                                                mx: 1,
                                                                background: '#9d0000',
                                                                color: '#fff',
                                                                "&:hover": {
                                                                    background: "#b03232",
                                                                }
                                                            }}
                                                        >
                                                            Cerrar Sesión
                                                        </Button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <div className="modal fade" id="replacePictureModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ background: "#1f1f1f" }}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel" style={{color: '#fff'}}>Cambiar Fotografia</h5>
                                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <img src={state.preview}
                                    alt="Avatar" className="img-fluid my-5" style={{ width: '200px' }} />
                                <input type="file" name="avatar" accept='.png, .jpg, .jpeg' style={{color: '#fff'}}
                                    onChange={(e) => {
                                        setState({ ...state, preview: URL.createObjectURL(e.target.files[0]) })
                                    }}
                                />
                            </div>

                            <div className="modal-footer">

                                <Button className="button my-3" data-mdb-dismiss="modal"
                                    onClick={() => {
                                        setState({ ...state, preview: state.foto })
                                        setOpen(false)
                                    }}
                                    sx={{
                                        mr: 3,
                                        background: '#c60004',
                                        color: '#fff',
                                        "&:hover": {
                                            background: '#d13236',
                                        }
                                    }}
                                >
                                    Cancelar
                                </Button>

                                <Button className="button my-3" 
                                    onClick={() => {
                                        setState({...state, foto: state.preview})
                                        setOpen(false)
                                    }}
                                    sx={{
                                        background: "#40A347",
                                        color: '#fff',
                                        "&:hover": {
                                            background: '#66b56b',
                                        }
                                    }}
                                >
                                    Actualizar
                                </Button>


                            </div>
                        </div>
                    </div>
                </Modal>
                {/* </div> */}
                

                {/* <div className="modal fade" id="confirmModal" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true"> */}
                <Modal
                    open={open2}
                    onClose={() => setOpen2(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ background: "#1f1f1f" }}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel" style={{color:'#fff'}}>Ingresar contraseña</h5>
                                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <Typography variant="details" noWrap component="div" align="left" alignSelf={'left'}
                                    sx={{ border: 0, pb: 1, color: '#fff' }}
                                >
                                    Confirme su contraseña para guardar los cambios
                                </Typography>

                                <CssTextField
                                    margin="normal"
                                    fullWidth
                                    autoComplete='off'
                                    required
                                    id="actual"
                                    name="actual"
                                    type='password'
                                    value={state.verificar_contrasena}
                                    onChange={(e) => setState({ ...state, verificar_contrasena: e.target.value })}
                                    sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                                />

                            </div>

                            <div className="modal-footer">

                                <Button className="button my-3" data-mdb-dismiss="modal" onClick={close_contrasena}
                                    sx={{
                                        mr: 3,
                                        background: '#c60004',
                                        color: '#fff',
                                        "&:hover": {
                                            background: '#d13236',
                                        }
                                    }}
                                >
                                    Cancelar
                                </Button>

                                <Button className="button my-3" data-mdb-dismiss="modal"
                                    type='submit'
                                    sx={{
                                        background: "#40A347",
                                        color: '#fff',
                                        "&:hover": {
                                            background: '#66b56b',
                                        }
                                    }}
                                >
                                    Actualizar
                                </Button>


                            </div>
                        </div>
                    </div>
                </Modal>
                {/* </div> */}


            </Box>

        </>
    )

}
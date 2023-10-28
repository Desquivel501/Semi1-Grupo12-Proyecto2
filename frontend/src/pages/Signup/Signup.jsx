import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { alpha, styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Swal from 'sweetalert2'
import { useContext, useState, useEffect } from "react";

import { signUp } from "../../auth/auth";

import { registrar, deleteData } from "../../api/api";

export default function Signup() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const placeholder = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';


  const onSelectFile = (e) => {
      if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile();
        return;
      }
      setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
      if (!selectedFile) {
        setPreview();
        return;
      }
  
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
  
      return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    
    try {  
      
      const res = await registrar(data)

      if(res.TYPE != 'SUCCESS') {
        let err = {}
        err.message = res.MESSAGE
        throw new Error(res.err)
      }

      await signUp(data.get('dpi'), data.get('name'), data.get('lastName'), data.get('email'), data.get('password'), res.avatar)

      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado exitosamente',
        text: 'Por favor, asegurese de confirmar su correo electrónico',
        showConfirmButton: false
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });

    } catch (err) {

      console.log(err);

      const endpoint = `/users/${data.get('email')}`
      const del = await deleteData({endpoint})
      console.log(del);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(0);
        }
      });
    }
  
    event.target.reset();
  };

  const customTheme = createTheme({
    palette: {
      background: {
        default: "#171819",
      },
    },
  });

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
  
  return (
    <>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
        <Grid
            container
            component="main"
            sx={{ width: "100%"}}
            justifyContent={"center"}
          > 
            <Grid
              item
              xs={12}
              component={Paper}
              elevation={6}
              square
              alignItems="center"
              justifyContent="center"
              sx={{
                  borderRadius: 8,
                  backgroundColor: "#38393a",
              }}
            >
              <Box
                sx={{
                  my: 5,
                  mx: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: 1,
                  height: "100%"
                }}
                maxHeight={window.innerHeight}
                onSubmit={handleSubmit}
                component="form"
                justifyContent={"center"}
              >
                
                <Grid
                  container
                  spacing={3}
                  // sx={{ width: "80vw", height: "80vh", pt: 4, mt:"-100px" }}
                  alignContent={"center"}
                  justifyContent={"center"}
                  >
                      <Typography
                          variant="h3"
                          sx={{
                          mr: 2,
                          fontFamily: "monospace",
                          fontWeight: 700,
                          letterSpacing: ".3rem",
                          color: "#fff",
                          textDecoration: "none",
                          width: "100%",
                          }}
                          
                      >
                          Crear Usuario
                      </Typography>

                      <Grid
                        item
                        xs={6}
                      >

                        <Grid
                            item
                            xs={12}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <CssTextField
                            margin="normal"
                            required
                            fullWidth
                            id="dpi"
                            label="Dpi"
                            name="dpi"
                            type="number"
                            autoFocus
                            sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <CssTextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nombre"
                            name="name"
                            sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <CssTextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Apellido"
                            name="lastName"
                            sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                            />
                        </Grid>

                        
                        <Grid
                            item
                            xs={12}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <CssTextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo Electronico"
                            name="email"
                            sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <CssTextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                            />
                        </Grid>


                      </Grid>

                      <Grid
                        item
                        xs={4}
                        
                      >
                        
                        <Grid 
                          container 
                          alignItems="center"
                          justifyContent="space-around"
                        >

                          <Grid item xs={12} sx={{ border: 0 }}>
                            <Box
                                component="img"
                                sx={{ 
                                mt: 2,
                                maxWidth: '70%',
                                borderRadius: '50%',  
                                }}
                                alt="logo"
                                src={preview ? preview : placeholder}
                            />
                          </Grid>

                          <Grid item xs={8} sx={{ border: 0 }}>
                            <Button
                              component="label"
                              variant="contained"
                              startIcon={<CloudUploadIcon />}
                              fullWidth
                              height="100%"
                              sx={{ mt: 3, mb: 2, backgroundColor: '#3f51b5' }}
                            >
                              <input
                                type="file"
                                id="avatar"
                                hidden
                                onChange={onSelectFile}
                                accept=".png, .jpeg, .jpg"
                                name="avatar"
                              />
                              Subir Imagen
                            </Button>
                          </Grid>
                        </Grid>


                      </Grid>

                      <Grid
                          item
                          xs={8}
                          alignItems="center"
                          justifyContent="center"
                      >
                          <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 2, mb: 4, backgroundColor: '#3f51b5'}}
                          >
                          Registrarse
                          </Button>
                      </Grid>


                      
                </Grid>


                  
              </Box>
                

            </Grid>
        </Grid>
      <CssBaseline />
    </ThemeProvider>
    </>
  );
}
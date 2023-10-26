import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alpha, styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import Swal from 'sweetalert2'
import { useContext } from "react";
// import { signIn, getSession } from "../../auth/auth";

import { AuthContext } from "../../auth/authProvider";


export default function Login() {
  const [mensaje, setMensaje] = useState({ mensaje: "", tipo: "" });
  const navigate = useNavigate();

  const { user, signIn } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signIn(event.target.email.value, event.target.password.value)
      console.log("Usuario ingreso exitosamente");
      Swal.fire({
        icon: 'success',
        title: 'Se ha iniciado sesion',
        showConfirmButton: false
      }).then(() => {
        navigate("/home");
      })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
        showConfirmButton: false
      })
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
                my: 8,
                mx: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: 1,
              }}
              maxHeight={window.innerHeight}
              onSubmit={handleSubmit}
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
                  mb:2
                }}
              >
                Iniciar Sesión
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <CssTextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo Electronico"
                  name="email"
                  autoFocus
                  sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                />

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

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#3f51b5' }}
                >
                  Log In
                </Button>
              
                <Grid container>
                  <Grid item>
                    <Link
                      href="/Signup"
                    //   href="/RegistroCliente"
                      variant="body2"
                    //   style={{ color: "#626262", borderBottomColor: "#626262", '&:hover': { backgroundColor: '#626262' }}}
                    >
                      {"¿No tienes una cuenta? ¡Registrate!"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>

    </ThemeProvider>
  );
}
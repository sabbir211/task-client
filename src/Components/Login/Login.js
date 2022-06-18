import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom"
import useToken from '../../Hooks/useToken';
const theme = createTheme();

const Login = () => {
    const navigate = useNavigate()
    const { handleSubmit, control } = useForm()
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const handleLogin = (data) => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password)

    }
    const[token]=useToken(user)
    useEffect(() => {
        if (token) {
            swal("Success", "Sign in Success", "success")
            navigate("/")
        }
    }, [user,navigate,token])
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        swal('ERROR', error?.message.split("/")[1].split(")")[0], "error")
    }
   

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Typography component="p" variant="p" sx={{ color: "red" }}>
                        {error?.message.split("/")[1].split(")")[0]}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate sx={{ mt: 1 }}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => {
                                return <TextField
                                    {...field}
                                    type="email"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />

                            }}
                            defaultValue=""
                        />



                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => {
                                return <TextField
                                    {...field}
                                    type="password"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="email"
                                    autoComplete="current-password"
                                    autoFocus
                                />

                            }}
                            defaultValue=""
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                           
                            <Grid item>
                                <Link to="/register">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );

};

export default Login;
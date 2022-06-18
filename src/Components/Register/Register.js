
import React from 'react';
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
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm, Controller } from 'react-hook-form';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom"
import useToken from '../../Hooks/useToken';

const theme = createTheme();

const Register = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, control } = useForm()
    const [updateProfile, updating] = useUpdateProfile(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const onSubmit = async (data) => {
        console.log(data);
        const name = data.firstName + " " + data.lastName
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: name })
        
    }
    const [token]=useToken(user)
    if (loading || updating) {
        return <p>Loading...</p>
    }
    if (error) {
        console.log(error);
    }
    if (token) {
        swal("Success", "Sign up Success", "success")
        navigate("/")
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
                        Sign up
                    </Typography>
                    <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    render={({ field }) => {
                                        return <TextField
                                            {...field}
                                            required
                                            autoComplete="given-firstName"
                                            name="firstName"
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            variant='standard'
                                        />

                                    }}
                                    defaultValue=""
                                />

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    render={({ field }) => {
                                        return <TextField
                                            {...field}
                                            required
                                            autoComplete="given-lastName"
                                            name="lastName"

                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            autoFocus
                                            variant='standard'
                                        />

                                    }}
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => {
                                        return <TextField
                                            {...field}
                                            required
                                            type="email"
                                            autoComplete="given-email"
                                            name="email"

                                            fullWidth
                                            id="email"
                                            label="Email"
                                            autoFocus
                                            variant='standard'
                                        />

                                    }}
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => {
                                        return <TextField
                                            {...field}
                                            type="password"
                                            required
                                            autoComplete="given-password"
                                            name="password"
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            autoFocus
                                            variant='standard'
                                        />

                                    }}
                                    defaultValue=""
                                />
                            </Grid>
                           
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" >
                            
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}

export default Register

import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm, Controller } from 'react-hook-form';
import swal from 'sweetalert';
import { useNavigate, useParams } from "react-router-dom"
import { MenuItem, TextareaAutosize } from '@mui/material';
import SingleToDo from './SingleToDo';

const theme = createTheme();




const ImproveBehavior = () => {
    const { name } = useParams()
    console.log(name);
    const navigate = useNavigate()
    const [refetch, setRefetch] = useState(false)
    const [toDos, setToDos] = useState([])
    const { register, handleSubmit, control, reset } = useForm()
    const [user, loading] = useAuthState(auth)
    useEffect(() => {
        fetch(`https://task-pial.herokuapp.com/todo?email=${user?.email}&behavior=${name}`,{
            method:"get",
            headers:{
                authorization:`bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setToDos(data)
            })
    }, [name, user, refetch])
    if (loading) {
        return <p>Loading...</p>
    }

    const onSubmit = async (data) => {
        console.log(data.todo);
        if (user.email) {
            const finalTodo = { name: name, email: user.email, todo: data.todo }
            fetch(`https://task-pial.herokuapp.com/todo/${user.email}`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    authorization:`bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(finalTodo)
            })
                .then(res => res.json())
                .then(data => {
                   
                    console.log(data);
                    swal("Success", "Project added successfully", "success")
                    setRefetch(!refetch) 
                    reset()
                })
        }


    }
// deleting from database 
const handleDelete=(id)=>{
fetch(`https://task-pial.herokuapp.com/todo/${id}`,{
    method:"delete",
    headers:{
        authorization:`bearer ${localStorage.getItem("accessToken")}`
    }
})
.then(res=>res.json())
.then(data=>{
    console.log(data);
    if(data.deletedCount>0){
        swal("Success","Delete successful","success")
        setRefetch(!refetch)
    }
})
}

    return (
        <div>
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
                        <Typography component="h1" variant="h5">
                            Improve {name}
                        </Typography>
                        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <Controller
                                        name="todo"
                                        control={control}
                                        render={({ field }) => {
                                            return <TextField
                                                sx={{ minWidth: "350px" }}
                                                {...field}
                                                required
                                                autoComplete="given-todo"

                                                fullWidth
                                                id="todo"
                                                label="Write to improve"
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
                                Add
                            </Button>

                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>

            <div style={{margin:"5vw 10vw"}}>
                {
                 toDos.length>0 && toDos.map((t) => <SingleToDo handleDelete={handleDelete} key={t._id} todo={t}></SingleToDo>)
                }

            </div>
        </div>

    );
}

export default ImproveBehavior
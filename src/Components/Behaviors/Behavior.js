import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Country = ({ data }) => {
    const { name } = data
    const navigate = useNavigate()
    return (
        <Grid item xs={12} sm={4} >
            <Card sx={{ minWidth: 275 }}>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button size="large" onClick={() => {
                        navigate(`/improve/${name}`)
                    }}>Improve</Button>
                </CardActions>
            </Card>

        </Grid>

    );
};

export default Country;
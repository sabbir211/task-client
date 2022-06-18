import { Grid } from '@mui/material';
import React, {  useEffect, useState } from 'react';
import Behavior from './Behavior';
import "./projects.css"





const Behaviors = () => {
   
    const [loading,setLoading]=useState(false)
    const [behaviors, setBehaviors] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch("https://task-pial.herokuapp.com/behaviors")
            .then(res => res.json())
            .then(data => {
                setBehaviors(data)
            setLoading(false)
            })
    }, [])
    
    if(loading){
        return <p>loading...</p>
    }
    return (
            <div className='container'>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        behaviors.map((p, index) => <Behavior key={index} data={p}></Behavior>)
                    }
                </Grid>        
            </div>
        




    );
};

export default Behaviors;
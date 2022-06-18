import { Button } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
const SingleToDo = ({ todo,handleDelete }) => {
    return (
        <div style={{ backgroundColor: "#202d68", padding: "5px", margin: "10px", color: "white",   borderRadius: "10px" }}>
            <div style={{display:'flex',justifyContent:"space-between"}}>
                <p style={{ marginLeft: "10px",fontWeight: "600",fontSize: "1.5rem" }}>{todo.todo}</p>
                <Button variant="outlined" sx={{margin:'15px',color:'pink'}} startIcon={<DeleteIcon />}
                
                onClick={()=>handleDelete(todo._id)}
                >
                    Delete
                    
                </Button>
            </div>
        </div>
    );
};

export default SingleToDo;
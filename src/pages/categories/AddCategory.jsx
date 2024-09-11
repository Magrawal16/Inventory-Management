import React from 'react';
import { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';

export default function AddCategory({closeEvent}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const setRows = useAppStore((state) => state.setRows);
    const empCollectionRef = collection(db, "categories");


    const handleNameChange = (event) => {
        setName(event.target.value);
      };

      const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };


    const createUser = async()=>{
        await addDoc(empCollectionRef,{
            name: name,
            description: description,
        });
        getUsers();
        closeEvent();
        Swal.fire("Submitted!", "Your file has been submitted.", "Success");
    };

    const getUsers = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };


  return (
    <>
    <Box sx= {{ m: 2 }} />
    <Typography variant = "h5" align = "center">
        Add Category
    </Typography>
    <IconButton
    style= {{ position: "absolute", top: "0", right: "0"}}
    onClick= {closeEvent} >
        <CloseIcon />
    </IconButton>
    <Box height={20} />
    <Grid container spacing= {2} >
        <Grid item xs={12}>
        <TextField
         id="outlined-basic" 
         label="Name" 
         variant="outlined" 
         size="small"
         value={name} 
         onChange={handleNameChange} 
         sx={{ minWidth: "100%" }}/>
        </Grid>

        <Grid item xs={12}>
        <TextField
         id="outlined-basic" 
         label="Description" 
         variant="outlined"
         size="small"
         value={description}  
         onChange={handleDescriptionChange} 
         sx={{ minWidth: "100%" }}/>
        </Grid>


        <Grid item xs={12}>
            <Typography variant="h5" align="center">
                <Button variant= "contained" onClick={createUser}>
                    Submit
                </Button>
            </Typography>
        </Grid>
    </Grid>
    <Box sx={{ m: 4}} />
    </>
  )
}

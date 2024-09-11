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

export default function AddPermission({closeEvent}) {
    const [user_role, setUser_role] = useState("");
    const [permission, setPermission] = useState("");
    const setRows = useAppStore((state) => state.setRows);
    const empCollectionRef = collection(db, "permissions");

      const handleUser_roleChange = (event) => {
        setUser_role(event.target.value);
      };

      const handlePermissionChange = (event) => {
        setPermission(event.target.value);
      };
      
    const createUser = async()=>{
        await addDoc(empCollectionRef,{
            user_role: user_role,
            permission: permission
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
        Add Permissions
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
         label="User role" 
         variant="outlined"
         size="small"
         value={user_role}  
         onChange={handleUser_roleChange} 
         sx={{ minWidth: "100%" }}/>
        </Grid>

        <Grid item xs={12}>
        <TextField
         id="outlined-basic" 
         label="Permission's" 
         variant="outlined" 
         size="small"
         value={permission} 
         onChange={handlePermissionChange} 
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

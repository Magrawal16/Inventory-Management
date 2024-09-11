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
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';

export default function EditCategory({fid, closeEvent}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const setRows = useAppStore((state) => state.setRows);
    const empCollectionRef = collection(db, "categories");

    useEffect(() => {
        console.log("FID:" + fid.id);
        setName(fid.name);
        setDescription(fid.description);
    }, []);

    const getUsers = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      const createUser = async () => {
        const userDoc = doc(db, "categories", fid.id);
        const newFields = {
            name: name,
            description: description,
        };
        await updateDoc(userDoc, newFields);
        getUsers();
        closeEvent();
        Swal.fire("Submitted!", "Your file has been updated.", "success");
      };

    const handleNameChange = (event) => {
        setName(event.target.value);
      };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };


  return (
    <>
    <Box sx= {{ m: 2 }} />
    <Typography variant = "h5" align = "center">
        Edit Category
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
            error={false}
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            label="Name"
            size="small"
            sx={{ marginTop: "30px", minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={12}>
        <TextField
            error={false}
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            label="Description"
            size="small"
            sx={{ marginTop: "30px", minWidth: "100%" }}
          />
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

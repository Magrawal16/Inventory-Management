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
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';

export default function EditMaterial({fid, closeEvent}) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");
    const setRows = useAppStore((state) => state.setRows);
    const empCollectionRef = collection(db, "rawmaterials");
    const [errorMessage, setErrorMessage] = useState("");
    const [showAddPage, setShowAddPage] = useState(true);


    const handleNameChange = (event) => {
        setName(event.target.value);
      };

      const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
      };
    

      const handleCategoryChange = (event) => {
        setCategory(event.target.value);
      };

    const createUser = async()=>{
      if (!name || !quantity || !category){
        Swal.fire("Error", "All fields are required.", "error");
        setErrorMessage("All fields are required.");
        setShowAddPage(false);
         return;
      }
      try{
        await addDoc(empCollectionRef,{
            name: name,
            quantity: Number(quantity),
            category: category,
            date: String(new Date()),
        });
        getUsers();
        closeEvent();
        Swal.fire("Submitted!", "Your file has been submitted.", "Success");
    }catch (error) {
      
      console.error("Error adding document: ", error);
      
      setErrorMessage("An error occurred while submitting the data.");
    }
  };

    const getUsers = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

    const currencies = [
        {
          value: 'Mobiles',
          label: 'Mobiles',
        },
        {
          value: 'Laptops',
          label: 'Laptops',
        },
        {
          value: 'Headphones',
          label: 'Headphones',
        },
        {
          value: 'Cameras',
          label: 'Cameras',
        },
      ];

  return (
    <>
    {showAddPage && (
    <>
    <Box sx= {{ m: 2 }} />
    <Typography variant = "h5" align = "center">
        Add Materials
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

        <Grid item xs={6}>
        <TextField
            error={false}
            id="quantity"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            size="small"
            sx={{ minWidth: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={6}>
        <TextField 
        id="outlined-basic" 
        label="Category"
        select
        variant="outlined"
        size="small" 
        value={category}
        onChange={handleCategoryChange} 
        sx={{ minWidth: "100%" }}> 
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
  )}
  {errorMessage && (
        <div style={{ backgroundColor: "red", color: "white", padding: "10px" }}>
          {errorMessage}
        </div>
  )}
  </>
)
}

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

export default function AddCustomer({closeEvent}) {
    const [name, setName] = useState("");
    const [Phone_Number, setPhone_number] = useState("");
    const [email, setEmail] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const setRows = useAppStore((state) => state.setRows);
    const empCollectionRef = collection(db, "customers");


    const handleNameChange = (event) => {
        setName(event.target.value);
      };

      const handlePhone_numberChange = (event) => {
        setPhone_number(event.target.value);
        const phoneValue = event.target.value;
        
        if (/^\d{0,10}$/.test(phoneValue) || phoneValue === "") {
            setPhoneError(false);
            setPhone_number(phoneValue);
        } else if (phoneValue.length > 10){
            setPhoneError(false);
            setPhone_number(phoneValue.slice(0, 10));
        } else {
          setPhoneError(true);
        }
      };

      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };


    const createUser = async()=>{
      if (/^\d{0,10}$/.test(Phone_Number)) {
        await addDoc(empCollectionRef,{
            name: name,
            Phone_Number: Phone_Number,
            email: email,
        });
        getUsers();
        closeEvent();
        Swal.fire("Submitted!", "Your file has been submitted.", "Success");
    }else {
      setPhoneError(true); 
  }
};

    const getUsers = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };


  return (
    <>
    <Box sx= {{ m: 2 }} />
    <Typography variant = "h5" align = "center">
        Add Customer
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
         id="outlined-basic" 
         label="Phone Number" 
         variant="outlined"
         size="small"
         value={Phone_Number}  
         onChange={handlePhone_numberChange} 
         error={phoneError}
         helperText={phoneError ? "Please enter a valid 10-digit phone number" : ""}
         InputProps={{
          startAdornment: (
              <InputAdornment position="start" style={{ backgroundColor: '#f0f0f0' }}>
                  +91
              </InputAdornment>
          ),
      }}
      sx={{ minWidth: "100%" }} 
      maxLength="10"
      />
      
        </Grid>

        <Grid item xs={6}>
        <TextField
         id="outlined-basic" 
         label="Email" 
         variant="outlined"
         size="small"
         value={email}  
         onChange={handleEmailChange} 
         sx={{ minWidth: "100%" }}/>
        </Grid>

        <Grid item xs={12}>
            <Typography variant="h5" align="center">
                <Button variant= "conatined" onClick={createUser}>
                    Submit
                </Button>
            </Typography>
        </Grid>
    </Grid>
    <Box sx={{ m: 4}} />
    </>
  )
}

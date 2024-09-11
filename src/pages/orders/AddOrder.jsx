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

export default function AddOrder({closeEvent}) {
    const [order_id, setOrder_id] = useState("");
    const [shipment_status, setShipment_status] = useState("");
    const [payment_status, setPayment_status] = useState("");
    const [total, setTotal] = useState("");
    const setRows = useAppStore((state) => state.setRows);
    const empCollectionRef = collection(db, "orders");


    const handleOrder_idChange = (event) => {
        setOrder_id(event.target.value);
      };

      const handleShipment_statusChange = (event) => {
        setShipment_status(event.target.value);
      };

      const handlePayment_statusChange = (event) => {
        setPayment_status(event.target.value);
      };

      const handleTotalChange = (event) => {
        setTotal(event.target.value);
      };

    const createUser = async()=>{
        await addDoc(empCollectionRef,{
            name: name,
            price: Number(price),
            category: category,
            date: String(new Date()),
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
        Add Order
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
         label="Order Id" 
         variant="outlined" 
         size="small"
         value={order_id} 
         onChange={handleOrder_idChange} 
         sx={{ minWidth: "100%" }}/>
        </Grid>

        <Grid item xs={12}>
        <TextField
         id="outlined-basic" 
         label="Shipment Status" 
         variant="outlined" 
         size="small"
         value={shipment_status} 
         onChange={handleShipment_statusChange} 
         sx={{ minWidth: "100%" }}/>
        </Grid>

        <Grid item xs={6}>
        <TextField
         id="outlined-basic" 
         label="Payemnt Status" 
         variant="outlined" 
         size="small"
         value={payment_status} 
         onChange={handlePayment_statusChange} 
         sx={{ minWidth: "100%" }}/>
        </Grid>

        <Grid item xs={6}>
        <TextField
         id="outlined-basic" 
         label="Total" 
         variant="outlined"
         type="number"
         InputProps={{
            startAdorment: (
                <InputAdornment position="Start">
                    <CurrencyRupeeIcon />
                </InputAdornment>
            ),
         }}
         size="small"
         value={total}  
         onChange={handleTotalChange} 
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

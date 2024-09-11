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

export default function EditOrder({fid,closeEvent}) {
    const [order_id, setOrder_id] = useState("");
    const [shipment_status, setShipment_status] = useState("");
    const [payment_status, setPayment_status] = useState("");
    const [total, setTotal] = useState("");
    const setRows = useAppStore((state) => state.setRows);
    const empCollectionRef = collection(db, "orders");

    useEffect(() => {
        console.log("FID:" + fid.id);
        setOrder_id(fid.order_id);
        setShipment_status(fid.shipment_status);
        setPayment_status(fid.payment_status);
        setTotal(fid.total);
    }, []);


    const getUsers = async () => {
      const data = await getDocs(empCollectionRef);
      setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
  
    const createUser = async () => {
      const userDoc = doc(db, "orders", fid.id);
      const newFields = {
        order_id: order_id,
        date: String(new Date()),
        shipment_status: shipment_status,
        payment_status: payment_status,
        total: Number(total),    
      };
      await updateDoc(userDoc, newFields);
      getUsers();
      closeEvent();
      Swal.fire("Submitted!", "Your file has been updated.", "success");
    };
  
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

  return (
    <>
    <Box sx= {{ m: 2 }} />
    <Typography variant = "h5" align = "center">
        Edit Orders
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
            id="order_id"
            name="order_id"
            value={order_id}
            onChange={handleOrder_idChange}
            label="Name"
            size="small"
            sx={{ marginTop: "30px", minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={12}>
        <TextField
            error={false}
            id="shipment_status"
            name="shipment_status"
            value={shipment_status}
            onChange={handleShipment_statusChange}
            label="Shipment Status"
            size="small"
            sx={{ marginTop: "30px", minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={6}>
        <TextField
            error={false}
            id="payment_status"
            name="payment_status"
            value={payment_status}
            onChange={handlePayment_statusChange}
            label="Payment Status"
            size="small"
            sx={{ marginTop: "30px", minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={6}>
        <TextField
            error={false}
            id="total"
            label="Total"
            type="number"
            value={total}
            onChange={handleTotalChange}
            size="small"
            sx={{ minWidth: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={createUser}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

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

export default function EditCustomer({fid, closeEvent}) {
    const [name, setName] = useState("");
    const [Phone_Number, setPhone_number] = useState("");
    const [email, setEmail] = useState("");
    const setRows = useAppStore((state) => state.setRows);
    const empCollectionRef = collection(db, "customers");;

    useEffect(() => {
        console.log("FID:" + fid.id);
        setName(fid.name);
        setPhone_number(fid.phone_number);
        setEmail(fid.email);
    }, []);

    const getUsers = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      const createUser = async () => {
        const userDoc = doc(db, "users", fid.id);
        const newFields = {
            name: name,
            phone_number: phone_number,
            email: email,
        };
        await updateDoc(userDoc, newFields);
        getUsers();
        closeEvent();
        Swal.fire("Submitted!", "Your file has been updated.", "success");
      };

      const handleNameChange = (event) => {
          setName(event.target.value);
        };
      
      const handlePhone_numberChange = (event) => {
          setPhone_number(event.target.value);
        };

      const handleEmailChange = (event) => {
          setEmail(event.target.value);
        };

  return (
    <>
    <Box sx= {{ m: 2 }} />
    <Typography variant = "h5" align = "center">
        Edit Customer
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
        <Grid item xs={6}>
        <TextField
            error={false}
            id="phone_number"
            name="Phone Number "
            value={phone_number}
            onChange={handlePhone_numberChange}
            label="Phone_number"
            size="small"
            sx={{ marginTop: "30px", minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
        <TextField
            error={false}
            id="email"
            name="Email"
            value={email}
            onChange={handleEmailChange}
            label="Email"
            size="small"
            sx={{ marginTop: "30px", minWidth: "100%" }}
          />
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

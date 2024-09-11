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

export default function EditUser({fid, closeEvent}) {
    const [user_role, setUser_role] = useState("");
    const [permission, setPermission] = useState("");
    const setRows = useAppStore((state) => state.setRows);
    const empCollectionRef = collection(db, "permissions");;

    useEffect(() => {
        console.log("FID:" + fid.id);
        setUser_role(fid.user_role);
        setPermission(fid.permission);
    }, []);

    const getUsers = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      const createUser = async () => {
        const userDoc = doc(db, "permissions", fid.id);
        const newFields = {
            user_role: user_role,
            permission: permission
        };
        await updateDoc(userDoc, newFields);
        getUsers();
        closeEvent();
        Swal.fire("Submitted!", "Your file has been updated.", "success");
      };

    const handleUser_roleChange = (event) => {
        setUser_role(event.target.value);
      };

      const handlePermissionChange = (event) => {
        setPermission(event.target.value);
      };


  return (
    <>
    <Box sx= {{ m: 2 }} />
    <Typography variant = "h5" align = "center">
        Edit Permission's
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
            name="User Role"
            value={user_role}
            onChange={handleUser_roleChange}
            label="User role"
            size="small"
            sx={{ marginTop: "30px", minWidth: "100%" }}
          />
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

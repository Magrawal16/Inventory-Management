import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from "sweetalert2";
import { useAppStore } from "../../appStore";
import Checkbox from "@mui/material/Checkbox";
import { doc, updateDoc } from "firebase/firestore";

export default function EditUser({ fid, closeEvent }) {
  const [name, setName] = useState("");
  const [user_role, setUser_role] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState(fid.permissions);
  const permissionsData = [
    { id: "permission1", name: "Permission 1" },
    { id: "permission2", name: "Permission 2" },
    { id: "permission3", name: "Permission 3" },
    { id: "permission4", name: "Permission 4" },
    { id: "permission5", name: "Permission 5" },
    // Add more permissions as needed
  ];
  const setRows = useAppStore((state) => state.setRows);
  const empCollectionRef = collection(db, "users");
  fid.permissions = [
    { id: "permission1", name: "Permission 1" },
    { id: "permission2", name: "Permission 2" },
    // ...
  ];
  
 
useEffect(() => {
  console.log("FID:" + fid.id);
  console.log("Name:", fid.name);
  console.log("User Role:", fid.user_role);
  console.log("Selected Permissions:", fid.permissions);
  setName(fid.name);
  setUser_role(fid.user_role || "");
  setSelectedPermissions(fid.selectedPermissions || []); // Initialize with an empty array if fid.selectedPermissions is undefined
}, [fid]);



  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const createUser = async () => {
    // Add logging to check selectedPermissions
    console.log("Selected Permissions before update:", selectedPermissions);
  
    const userDoc = doc(db, "users", fid.id);
    const newFields = {
      name: name,
      user_role: user_role,
      permissions: selectedPermissions.map((p) => p.name),
    };
  
    // Log newFields before update
    console.log("New Fields:", newFields);
  
    try {
      await updateDoc(userDoc, newFields);
      getUsers();
      closeEvent();
      Swal.fire("Submitted!", "Your file has been updated.", "success");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUser_roleChange = (event) => {
    setUser_role(event.target.value);
  };
  const handlePermissionChange = (event) => {
    const permissionId = event.target.value;
    const permission = permissionsData.find((p) => p.id === permissionId);
  
    setSelectedPermissions((prevPermissions) => {
      if (prevPermissions.some((p) => p.id === permissionId)) {
        return prevPermissions.filter((p) => p.id !== permissionId);
      } else {
        return [...prevPermissions, permission.name]; // Store permission.name, not the entire object
      }
    });
  };
  
  const newFields = {
    name: name || "", // Ensure that name is not undefined
    user_role: user_role || "", // Ensure that user_role is not undefined
    permissions: selectedPermissions.map((p) => p.name) || [], // Ensure that permissions is not undefined
  };
  
  console.log("New Fields:", newFields);
  
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Edit User
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
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
            id="User_role"
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
            id="permissions-select"
            select
            label="Permissions"
            variant="outlined"
            size="small"
            value={selectedPermissions.map((p) => p.id)}
            onChange={handlePermissionChange}
            sx={{ minWidth: "100%" }}
          >
            {permissionsData.map((permission) => (
              <MenuItem key={permission.id} value={permission.id}>
                <Checkbox
                  checked={selectedPermissions.some(
                    (p) => p.id === permission.id
                  )}
                />
                {permission.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={createUser}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}

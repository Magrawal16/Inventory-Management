import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from "sweetalert2";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

const permissionsData = [
  { id: "permission1", name: "Permission 1" },
  { id: "permission2", name: "Permission 2" },
  { id: "permission3", name: "Permission 3" },
  { id: "permission4", name: "Permission 4" },
  { id: "permission5", name: "Permission 5" },
  // Add more permissions as needed
];

const authenticationData = [
  "Authentication Level 1",
  "Authentication Level 2",
  "Authentication Level 3",
  "Authentication Level 4",
  "Authentication Level 5",
  "Authentication Level 6",
];

export default function AddUser({ closeEvent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [user_role, setUser_role] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [selectedAuthentication, setSelectedAuthentication] = useState([]);
  const empCollectionRef = collection(db, "users");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhonenoChange = (event) => {
    setPhoneno(event.target.value);
  };

  const handleUser_roleChange = (event) => {
    setUser_role(event.target.value);
  };

  const handlePermissionChange = (event) => {
    const permissionId = event.target.value;

    setSelectedPermissions((prevPermissions) => {
      if (prevPermissions.includes(permissionId)) {
        return prevPermissions.filter((p) => p !== permissionId);
      } else {
        return [...prevPermissions, permissionId];
      }
    });
  };

  const handleAuthenticationChange = (event) => {
    const authLevel = event.target.value;

    setSelectedAuthentication((prevAuthentication) => {
      if (prevAuthentication.includes(authLevel)) {
        return prevAuthentication.filter((auth) => auth !== authLevel);
      } else {
        return [...prevAuthentication, authLevel];
      }
    });
  };

  const createUser = async () => {
    const userPermissions = selectedPermissions.map((p) => p);
    const userAuthentication = selectedAuthentication.map((auth) => auth);

    await addDoc(empCollectionRef, {
      name: name,
      email: email,
      phoneno: phoneno,
      user_role: user_role,
      permissions: userPermissions,
      authentication: userAuthentication,
    });
    getUsers(); 
    closeEvent();
    Swal.fire("Submitted!", "Your file has been submitted.", "Success");
  };

  return (
    <>
      <Typography variant="h5" align="center">
        Add User
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={handleNameChange}
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
            size="small"
            value={email}
            onChange={handleEmailChange}
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            size="small"
            value={phoneno}
            onChange={handlePhonenoChange}
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="User role"
            variant="outlined"
            size="small"
            value={user_role}
            onChange={handleUser_roleChange}
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="permissions-select"
            select
            label="Permissions"
            variant="outlined"
            size="small"
            value=""
            onChange={handlePermissionChange}
            sx={{ minWidth: "100%" }}
          >
            {permissionsData.map((permission) => (
              <MenuItem key={permission.id} value={permission.id}>
                <Checkbox
                  checked={selectedPermissions.includes(permission.id)}
                />
                {permission.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="authentication-select"
            select
            label="Authentication"
            variant="outlined"
            size="small"
            value=""
            onChange={handleAuthenticationChange}
            sx={{ minWidth: "100%" }}
          >
            {authenticationData.map((authLevel) => (
              <MenuItem key={authLevel} value={authLevel}>
                <Checkbox
                  checked={selectedAuthentication.includes(authLevel)}
                />
                {authLevel}
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
    </>
  );
}

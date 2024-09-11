import { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from '../../firebase-config';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from '@mui/material/Modal';
import AddPermission from "./AddPermission";
import { useAppStore } from '../../appStore';
import EditPermission from "./EditPermission";
import Skeleton from '@mui/material/Skeleton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = useAppStore((state) => state.rows);
  const setRows = useAppStore((state) => state.setRows);
  const empCollectionRef = collection(db, "users");
  const [selectedPermissions, setSelectedPermissions] = useState([]); // Store selected permissions
  const [permissions, setPermissions] = useState([]);
  const [formid, setFormid] = useState("");
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  useEffect(() => {
    getUsers();
    getAllPermissions();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "permissions", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };
  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      getUsers();
    }
  };

  const editData = (id, User_Role, Permissions) =>{
    const data = {
      id: id,
      User_Role: User_Role,
      Permissions: Permissions,
    };
    setFormid(data);
    handleEditOpen();
  };

  const getAllPermissions = async () => {
    // Fetch all available permissions from your database
    // You may need to adjust this based on your Firestore structure
    const permissionsData = await getDocs(collection(db, "permissions"));
    const permissionsArray = permissionsData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPermissions(permissionsArray);
  };

  const handlePermissionChange = (event) => {
    const selectedPermissionId = event.target.value;
    const selectedPermission = permissions.find(
      (permission) => permission.id === selectedPermissionId
    );

    // Add or remove the selected permission to/from the list
    setSelectedPermissions((prevPermissions) => {
      if (prevPermissions.includes(selectedPermission)) {
        return prevPermissions.filter(
          (permission) => permission.id !== selectedPermissionId
        );
      } else {
        return [...prevPermissions, selectedPermission];
      }
    });
  };

  const saveUserPermissions = async (userId) => {
    // Update the user's permissions in the database
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, { permissions: selectedPermissions });
    Swal.fire("Permissions Updated!", "User's permissions have been updated.", "success");
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddPermission closeEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editopen}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditPermission closeEvent={handleEditClose} fid={formid} />
          </Box>
        </Modal>
      </div>
      {true && (
        <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Permission List
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.user_role || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search" />
              )}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
              Add
            </Button>
          </Stack>
          <Box height={10} />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    User Role
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Permissions
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell align="left"> {row.user_role} </TableCell>
                        <TableCell align="left">
                          <div>
                            <select
                              value=""
                              onChange={handlePermissionChange}
                            >
                              <option value="" disabled>
                                Assign Permission
                              </option>
                              {permissions.map((permission) => (
                                <option
                                  key={permission.id}
                                  value={permission.id}
                                >
                                  {permission.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {selectedPermissions.map((selectedPermission) => (
                            <div key={selectedPermission.id}>
                              <input
                                type="checkbox"
                                id={selectedPermission.id}
                                checked={selectedPermissions.includes(selectedPermission)}
                                onChange={handlePermissionChange}
                                value={selectedPermission.id}
                              />
                              <label htmlFor={selectedPermission.id}>
                                {selectedPermission.name}
                              </label>
                            </div>
                          ))}
                          <Button
                            variant="contained"
                            onClick={() => saveUserPermissions(row.id)}
                          >
                            Save Permissions
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() => {
                                editData(row.id, row.user_role, row.permissions);
                              }}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {rows.length >= 1 && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      )}
      {rows.length === 0 && (
        <>
          <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={30} />
            <Box height={40} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
          </Paper>
        </>
      )}
    </>
  );
}
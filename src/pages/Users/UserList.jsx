import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useAppStore } from "../../appStore";
import Skeleton from "@mui/material/Skeleton";
import AddUser from "./AddUser"; 
import EditUser from "./EditUser"; 
import UserDetailCard from "./UserDetailCard"; // Adjust the import path based on your project structure



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "users");
  const [formid, setFormid] = useState("");
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);


  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseUserDetail = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const data = await getDocs(empCollectionRef);
      setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
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
      if (result.isConfirmed) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "users", id);
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

  const editData = (id, name, User_Role, permissions, authentication) => {
    const data = {
      id: id,
      name: name,
      User_Role: User_Role,
      permissions: permissions,
      authentication: authentication,
    };
    setFormid(data);
    handleEditOpen();
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
            <AddUser closeEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editopen}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditUser closeEvent={handleEditClose} fid={formid} />
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
            User List
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
              getOptionLabel={(rows) => rows.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={handleOpen}
            >
              Add
            </Button>
          </Stack>
          <Box height={10} />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    User Role
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Permissions
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Authentication
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
                        key={row.id}
                        onClick={() => handleUserClick(row)} // Open user detail card on click
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell align="left"> {row.name} </TableCell>
                        <TableCell align="left"> {row.user_role} </TableCell>
                        <TableCell align="left">
                          {row.permissions &&
                            row.permissions.map((permission) => (
                              <div
                                key={permission}
                                style={{
                                  backgroundColor: "#e0e0e0",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  display: "inline-block",
                                  marginRight: "4px",
                                }}
                              >
                                {permission}
                              </div>
                            ))}
                        </TableCell>
                        <TableCell align="left">
                          {row.authentication &&
                            row.authentication.map((auth) => (
                              <div
                                key={auth}
                                style={{
                                  backgroundColor: "#e0e0e0",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  display: "inline-block",
                                  marginRight: "4px",
                                }}
                              >
                                {auth}
                              </div>
                            ))}
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
                                editData(
                                  row.id,
                                  row.name,
                                  row.user_role,
                                  row.permissions,
                                  row.authentication
                                );
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
              {selectedUser && (
        <UserDetailCard
          user={selectedUser}
          open={Boolean(selectedUser)}
          onClose={handleCloseUserDetail}
        />
      )}
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

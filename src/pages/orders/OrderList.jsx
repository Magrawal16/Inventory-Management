 import { useState, useEffect } from "react";
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
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from "@mui/material/Modal";
import AddOrder from "./AddOrder";
import { useAppStore } from "../../appStore";
import EditOrder from "./EditOrder";
import Skeleton from "@mui/material/Skeleton";

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

export default function OrderList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = useAppStore((state) => state.rows);
  const setRows = useAppStore((state) => state.setRows);
  const empCollectionRef = collection(db, "orders");
  const [formid, setFormid] = useState("");
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
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
    const userDoc = doc(db, "products", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getUsers();
    }
  };

  const editData = (id, order_id, shipment_status, payment_status, total) => {
    const data = {
      id: id,
      order_id: order_id,
      shipment_status: shipment_status,
      payment_status: payment_status,
      total: total,
    };
    setFormid(data);
    handleEditOpen();
  };

  const statusOptions = [
    { label: "Shipped", color: "green" },
    { label: "In-Transit", color: "grey" },
    // Add more status options as needed
  ];

  const paymentStatusOptions = [
    { label: "Paid", color: "green" },
    { label: "Processing", color: "grey" },
    // Add more payment status options as needed
  ];

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
            <AddOrder closeEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editopen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditOrder closeEvent={handleEditClose} fid={formid} />
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
            Order List
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
              getOptionLabel={(rows) => rows.price || ""}
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
                    Order Id
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Shipment Status
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Payment Status
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Total
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Date
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
                        <TableCell align="left">{row.order_id}</TableCell>
                        <TableCell align="left">
                          {/* Dropdown for Shipment Status */}
                          <Autocomplete
                            id={`shipment-status-${row.id}`}
                            options={statusOptions}
                            getOptionLabel={(option) => option.label}
                            style={{ width: 120 }}
                            value={statusOptions.find(
                              (option) => option.label === row.shipment_status
                            )}
                            onChange={(event, newValue) => {
                              if (newValue) {
                                // Update the shipment status
                                // You can perform an API call here to update the status in the database
                                const updatedRows = [...rows];
                                const updatedRow = updatedRows.find(
                                  (r) => r.id === row.id
                                );
                                if (updatedRow) {
                                  updatedRow.shipment_status = newValue.label;
                                  setRows(updatedRows);
                                }
                              }
                            }}
                            renderInput={(params) => (
                              <TextField {...params} variant="standard" />
                            )}
                            renderOption={(props, option) => (
                              <li {...props}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      backgroundColor: option.color,
                                      borderRadius: "50%",
                                      display: "inline-block",
                                      width: "12px",
                                      height: "12px",
                                      marginRight: "8px",
                                    }}
                                  />
                                  {option.label}
                                </div>
                              </li>
                            )}
                          />
                        </TableCell>
                        <TableCell align="left">
                          {/* Dropdown for Payment Status */}
                          <Autocomplete
                            id={`payment-status-${row.id}`}
                            options={paymentStatusOptions}
                            getOptionLabel={(option) => option.label}
                            style={{ width: 120 }}
                            value={paymentStatusOptions.find(
                              (option) => option.label === row.payment_status
                            )}
                            onChange={(event, newValue) => {
                              if (newValue) {
                                // Update the payment status
                                // You can perform an API call here to update the status in the database
                                const updatedRows = [...rows];
                                const updatedRow = updatedRows.find(
                                  (r) => r.id === row.id
                                );
                                if (updatedRow) {
                                  updatedRow.payment_status = newValue.label;
                                  setRows(updatedRows);
                                }
                              }
                            }}
                            renderInput={(params) => (
                              <TextField {...params} variant="standard" />
                            )}
                            renderOption={(props, option) => (
                              <li {...props}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      backgroundColor: option.color,
                                      borderRadius: "50%",
                                      display: "inline-block",
                                      width: "12px",
                                      height: "12px",
                                      marginRight: "8px",
                                    }}
                                  />
                                  {option.label}
                                </div>
                              </li>
                            )}
                          />
                        </TableCell>
                        <TableCell align="left">{row.total}</TableCell>
                        <TableCell align="left">{String(row.date)}</TableCell>
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
                                  row.order_id,
                                  row.date,
                                  row.shipment_status,
                                  row.payment_status,
                                  row.total
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
            </Table>
          </TableContainer>
          {rows.length >= 1 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
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
      {rows.length == 0 && (
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

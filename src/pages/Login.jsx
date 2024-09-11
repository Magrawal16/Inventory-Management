import React from "react";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "../bg/signin.svg";
import bgimg from "../bg/login.svg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const center = {
  position: "relative",
  top: "50%",
  left: "37%",
};

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // Track login state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "" && password === "") {
      setLoggedIn(true);
      setUser({
        username: "admin",
        password: "password",
      });
      navigate("/home");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  marginTop: "40px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "63vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",
                  backgroundColor: "#3b33d5",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={35} />
                    <Box sx={center}>
                      <Avatar
                        sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        Sign In
                      </Typography>
                    </Box>
                    <Box height={35} />
                    <Grid container spacing={1}>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth= {true}
                          id="email"
                          label="Username"
                          name="email"
                          autoComplete="email"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </Grid>
                      <Box height={10} />
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth={true}
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Grid>
                      <Box height={25} />
                      <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth={true}
                          size="large"
                          onClick={handleLogin}
                          sx={{
                            mt: "10px",
                            mr: "20px",
                            borderRadius: 28,
                            color: "#ffffff",
                            minWidth: "170px",
                            backgroundColor: "#FF9A01",
                          }}
                        >
                          Sign in
                        </Button>
                      </Grid>
                    </Grid>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Login;

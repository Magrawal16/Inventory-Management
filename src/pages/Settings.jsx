import React from 'react'
import Sidenav from '../components/Sidenav'
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';

export default function Settings() {
  return (
    <>
    <NavBar />
    <Box height={30}></Box>
        <Box sx={{ display: 'flex' }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} > 
              <h1> Settings </h1>
            </Box>
        </Box>
 
    </>
  )
}

import React from 'react'
import Sidenav from '../components/Sidenav'
import NavBar from '../components/NavBar';
import CustomerList from './customers/CustomerList'
import Box from '@mui/material/Box';
export default function Customers() {
  return (
    <>
    <div className='bgcolor'>
    <NavBar />
    <Box height={70}></Box>
        <Box sx={{ display: 'flex' }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
                <CustomerList />
            </Box>
        </Box>
        </div>
 
    </>
  )
}

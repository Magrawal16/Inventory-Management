import React from 'react'
import Sidenav from '../components/Sidenav'
import NavBar from '../components/NavBar';
import SupplierList from './suppliers/SupplierList'
import Box from '@mui/material/Box';
export default function Suppliers() {
  return (
    <>
    <div className='bgcolor'>
    <NavBar />
    <Box height={70}></Box>
        <Box sx={{ display: 'flex' }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
                <SupplierList />
            </Box>
        </Box>
        </div>
 
    </>
  )
}

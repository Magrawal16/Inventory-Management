import React from 'react'
import Sidenav from '../components/Sidenav'
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import OrderList from './orders/OrderList';

export default function Orders() {
  return (
    <>
    <div className='bgcolor'>
    <NavBar />
    <Box height={70}></Box>
        <Box sx={{ display: 'flex' }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
                <OrderList />
            </Box>
        </Box>
        </div>
 
    </>
  )
}
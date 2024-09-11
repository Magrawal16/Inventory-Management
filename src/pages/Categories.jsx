import React from 'react'
import Sidenav from '../components/Sidenav'
import NavBar from '../components/NavBar';
import CategoryList from './categories/CategoryList'
import Box from '@mui/material/Box';
export default function Categories() {
  return (
    <>
    <div className='bgcolor'>
    <NavBar />
    <Box height={70}></Box>
        <Box sx={{ display: 'flex' }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
                <CategoryList />
            </Box>
        </Box>
        </div>
 
    </>
  )
}

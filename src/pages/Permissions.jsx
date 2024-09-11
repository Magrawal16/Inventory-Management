import React from 'react'
import Sidenav from '../components/Sidenav'
import NavBar from '../components/NavBar';
import PermissionList from './permissions/PermissionList'
import Box from '@mui/material/Box';
export default function Permissions() {
  return (
    <>
    <div className='bgcolor'>
    <NavBar />
    <Box height={70}></Box>
        <Box sx={{ display: 'flex' }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
                <PermissionList />
            </Box>
        </Box>
        </div>
 
    </>
  )
}

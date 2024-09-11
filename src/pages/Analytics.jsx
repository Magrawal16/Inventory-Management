import React from 'react'
import Sidenav from '../components/Sidenav'
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import '../Dash.css'
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccordionDash from '../components/AccordionDash';
import BarCharts from '../charts/BarCharts';

export default function Analytics() {
  return (
    <>
<div className='bgcolor'>
   <NavBar />
    <Box height={70} />
        <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
              <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Stack spacing={2} direction= "column">
                            <Stack spacing={2} direction ="row">
                                <Card sx={{ minWidth: 30 + "%", height: 152 }} className='gradient'>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                                            Visitors
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                                            22000
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
                                                Since last week
                                            </Typography>
                                        </CardContent>
                                </Card>
                                <Card sx={{ minWidth: 30 + "%", height: 152 }} className='gradientlight'>
                                    <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                                            Visitors
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                                            22000
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div" sx={{color: "#ccd1d1"}}>
                                            Since last week
                                            </Typography>
                                    </CardContent>   
                                </Card>
                            </Stack>
                            <Stack spacing={2} direction ="row">
                                <Card sx={{ minWidth: 30 + "%", height: 152 }} className='gradient'>
                                    <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                                            Visitors
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                                            20000
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div" sx={{color: "#ccd1d1"}}>
                                                Since last week
                                            </Typography>
                                    </CardContent>   
                                </Card>
                                <Card sx={{ minWidth: 30 + "%", height: 152 }} className='gradientlight'>
                                    <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                                            Visitors
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                                            32000
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div" sx={{color: "#ccd1d1"}}>
                                            Since last week
                                            </Typography>
                                    </CardContent>   
                                </Card>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack spacing={0}>
                            <Card sx={{ minWidth: 50 + "%", height: 320 }} className='gradientlight'> 
                                <Stack spacing={2} direction= "row">
                                    <div className='iconstyle'>
                                    <StorefrontIcon />
                                    </div>
                                    <div className='paddingall'> 
                                        <span className='pricetitle'> $203k </span>
                                        <br />
                                        <span className='pricesubtitle'> Total Income </span>
                                    </div>
                                </Stack> 
                            </Card>
                        </Stack>
                    </Grid>
              </Grid>
             <Box height={20} />
               <Grid container spacing={2}>
                  <Grid item xs={8}>
                     <Card sx={{ height: 60 + "vh" }}>
                        <CardContent>
                          <BarCharts />
                        </CardContent>   
                     </Card>
                   </Grid>
                  <Grid item xs={4}>
                    <Card sx={{ height: 60 + "vh" }}>
                      <CardContent>
                         <div className='paddingall'> 
                            <span className='pricetitle'> Popular Products </span>
                                <br />
                          </div>
                        <AccordionDash />
                      </CardContent>   
                    </Card>
                  </Grid>
            </Grid>
            </Box>
         </Box>
    </div> 
    </>
  )
}

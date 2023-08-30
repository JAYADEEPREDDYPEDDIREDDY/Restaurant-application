import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import '../styles/DashBoard.css'
const DashBoard = () => {
  return (
    <Box sx={{ padding: '20px' ,marginLeft:'25px'}}>
      <Grid container spacing={3}>
        <Grid item xs={10} md={6} lg={3}>
          <Paper elevation={12} sx={{ backgroundColor: '#1677ff', height: '80px', textAlign: 'center', padding: '20px' }}>
           <h3> Delivered orders</h3> 
           <h1>20</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={12} sx={{ backgroundColor: '#1677ff', height: '80px', textAlign: 'center', padding: '20px' }}>
            <h3>Active Orders</h3>
            <h1>20</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={12} sx={{ backgroundColor: '#1677ff', height: '80px', textAlign: 'center', padding: '20px' }}>
           <h3>Pending Orders</h3>
           <h1>20</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={12} sx={{ backgroundColor: '#1677ff', height: '80px', textAlign: 'center', padding: '20px' }}>
           <h3>Customer Cancelled Orders</h3>
           <h1>20</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={12} sx={{ backgroundColor: '#1677ff', height: '80px', textAlign: 'center', padding: '20px' }}>
             <h3>Restaurants</h3>
             <h1>20</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={12} sx={{ backgroundColor: '#1677ff', height: '80px', textAlign: 'center', padding: '20px' }}>
           <h3> Categories</h3>
           <h1>20</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={12} sx={{ backgroundColor: '#1677ff', height: '80px', textAlign: 'center', padding: '20px' }}>
            <h3>Food Items</h3>
            <h1>20</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={12} sx={{ backgroundColor: '#1677ff', height: '80px', textAlign: 'center', padding: '20px' }}>
           <h3> Promotions</h3>
           <h1>20</h1>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashBoard;

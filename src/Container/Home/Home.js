import React from 'react';
import { Grid, Box, Stack, Typography } from '@mui/material';
import RevenueUpdates from '../../Components/DashBoard/RevenueUpdates';
import YearlyBreakup from '../../Components/DashBoard/YearlyBreakup';
import MonthlyEarnings from '../../Components/DashBoard/MonthlyEarnings';
import WeeklyStats from '../../Components/DashBoard/WeeklyStats';
import TopPerformers from '../../Components/DashBoard/TopPerformers';


const HomePage = () => (
  <Box>
    <Grid container spacing={3}>
    <Grid item xs={12} lg={8}>
          <RevenueUpdates />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} lg={12}>
              <YearlyBreakup />
            </Grid>
            <Grid item xs={12} sm={4} lg={12}>
              <MonthlyEarnings />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <WeeklyStats />
        </Grid>
        <Grid item xs={12} lg={8}>
          <TopPerformers />
        </Grid>
    </Grid>
  </Box>
);

export default HomePage;

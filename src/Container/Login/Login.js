import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Stack, Typography } from '@mui/material';
import PageContainer from '../../Components/Page/PageContainer';
import img1 from '../../Asset/Images/Svg/login-bg.svg';
import AuthLogin from '../../Components/Auth/AuthLogin';

const Login = () => (
  <PageContainer title="Login" description="this is Login page">
    <Grid  container spacing={0} >
      <Grid
        item
        xs={12}
        sm={12}
        lg={7}
        xl={8}
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Box position="relative">
          <Box px={3}>
                    <Box height={40} width={160} style={{margin:15,padding:5}}/>
          
            {/* <Logo /> */}
          </Box>
          <Box
            alignItems="center"
            justifyContent="center"
            height={'calc(100vh - 75px)'}
            sx={{
              display: {
                xs: 'none',
                lg: 'flex',
              },
            }}
          >
            <img
              src={img1}
              alt="bg"
              style={{
                width: '100%',
                maxWidth: '500px',
              }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        lg={5}
        xl={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box p={4}>
          <AuthLogin
            title="Welcome"
           
            subtitle={
              <Stack direction="row" spacing={1} sx={{alignItems:"center"}}  mt={3}>
                <Typography color="textSecondary" variant="subtitle1" fontWeight="400">
                  New User?
                </Typography>
                <Typography
                  component={Link}
                  to="/register"
                  fontWeight="500"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  Create an account
                </Typography>
              </Stack>
            }
          />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default Login;

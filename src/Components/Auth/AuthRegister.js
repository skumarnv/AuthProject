import React, { useState } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../Common/CustomTextField';
import CustomFormLabel from '../Common/CustomFormLabel';
import { Stack } from '@mui/system';
import AuthSocialButtons from '../Common/AuthSocialButtons';
import { alphabetRegex, EmailRegex, mobileNoRegex } from '../../Utilities/CommonFunction/Commonfn';
import toast from 'react-hot-toast';
import axios from 'axios';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const api = axios.create({
  baseURL: 'https://localhost:7112/api',
});

const AuthRegister = ({ title, subtitle, subtext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [toast, setToast] = useState(false);
  const [toastMessage, settoastMessage] = useState("");
  const [status, setstatus] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");

  }
  const onChangeMobile = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  }
  const onChangeName = (e) => {
    setName(e.target.value);
    setNameErr("");
  }
  const handleClick = () => {
    setToast(true);
  };

  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToast(false);
  };

  const handleSubmit = async () => {
    let isValid = true;
    let nameValid = true;
    if(name == "" || name == null || name == undefined)
    {
      nameValid = false;
      setNameErr("please enter your name")
    }
    else{
      nameValid = true;
      setNameErr("")
    }
    if (EmailRegex(email)) {
      isValid = true
      setEmailErr("")
    } else {
      isValid = false
      setEmailErr("please enter valid email")
    }
    if (password.length >= 8) {
      isValid = true
      setPasswordErr("")
    } else {
      isValid = false
      setPasswordErr("password must be 8 character")
    }
    if (isValid && nameValid) {
      handleClick();
      let Email = email;
      let PasswordHash = password;     
      try {
        const response = await api.post('/auth/Register', { Email, PasswordHash });
        //localStorage.setItem('token', response.data.token);
        setstatus(response.data.status == "E" ? "error" : "success")
        settoastMessage(response.data)    
        setTimeout(() => {
          response.data.status == "E"  ? window.location.href = '/': window.location.href = '/register';
        }, 1000);  
        
      } catch (err) {
        setstatus("error")
        settoastMessage("Invalid credentials")
        console.log('Invalid credentials');
      }
    }
  }
  return (

    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <AuthSocialButtons title="Sign up with" />

      <Box mt={3} ml={3} mr={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign up with
          </Typography>
        </Divider>
      </Box>

      <Box sx={{ width: "100%", alignSelf: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: "90%", alignSelf: "center" }}>
          <Stack mb={3}>
            <CustomFormLabel sx={{ mt: 2 }} htmlFor="name">Name</CustomFormLabel>
            <CustomTextField
              height={45}
              id="name"
              variant="outlined"
              fullWidth
              value={name}
              helperText={nameErr}
              onChange={onChangeName}
            />
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <CustomTextField
              height={45}
              id="email"
              variant="outlined"
              fullWidth
              value={email}
              helperText={emailErr} onChange={onChangeEmail}
            />
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              height={45}
              value={password}
              helperText={passwordErr} onChange={onChangeMobile}
            />
          </Stack>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            sx={{
            borderRadius: '7px',
          }}
            // component={Link}
            // to="/side"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          {subtitle}

        </Box>

      </Box>
      <Snackbar open={toast} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={status}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AuthRegister;

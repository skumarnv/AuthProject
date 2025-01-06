import React, { use, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import CustomCheckbox from '../../Components/Common/CustomCheckbox';
import CustomTextField from '../../Components/Common/CustomTextField';
import CustomFormLabel from '../../Components/Common/CustomFormLabel';
import { EmailRegex } from '../../Utilities/CommonFunction/Commonfn';
import axios from 'axios';
import { mobileNoRegex } from '../../Utilities/CommonFunction/Commonfn';
import AuthSocialButtons from '../Common/AuthSocialButtons';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const api = axios.create({
  baseURL: 'https://localhost:7112/api',
});

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [toast, setToast] = useState(false);
  const [toastMessage, settoastMessage] = useState("");
  const [status, setstatus] = useState("");

  useEffect(()=>{
    localStorage.setItem('token', '');
  },[])
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");

  }
  const onChangeMobile = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
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
    if (EmailRegex(email)) {
      isValid = true
      setEmailErr("")
    } else {
      isValid = false
      setEmailErr("please enter valid username")
    }
    if (password.length >= 8) {
      isValid = true
      setPasswordErr("")
    } else {
      isValid = false
      setPasswordErr("password must be 8 character")
    }
    if (isValid) {
      handleClick();
      let Email = email;
      let PasswordHash = password;
      try {
        const response = await api.post('/auth/Login', { Email, PasswordHash });
        localStorage.setItem('token', response.data.token);
        setstatus(response.data.status == "E" ? "error" : "success")
        settoastMessage(response.data.message)
        setTimeout(() => {
          response.data.status == "E" ? window.location.href = '/' : window.location.href = '/side';
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

      <Stack>
        <Box>
          <CustomFormLabel htmlFor="username">Email</CustomFormLabel>
          <CustomTextField helperText={emailErr} onChange={onChangeEmail} id="username" variant="outlined" fullWidth />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField helperText={passwordErr} onChange={onChangeMobile} id="password" type="password" variant="outlined" fullWidth />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit}
          // component={Link}
          to="/side"
          sx={{
            borderRadius: '7px',
          }}
          type="submit"
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
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
export default AuthLogin;

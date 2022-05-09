import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSearchParams, useNavigate } from "react-router-dom";

import { apiReset } from '../api/auth.api';

const theme = createTheme();

export default function Reset({setStatus}) {
  const [sendStatus, setSendStatus] = useState(false);
  const [reseted, setReseted] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    password: 'Choose a strong password!',
    confirmPassword: 'Please, confirm the password before send form data!',
  });

  const [ urlParams ] = useSearchParams();
  const code = urlParams.get('code');

  let navigate = useNavigate();
  
  const redirect = () => {
    navigate("/signIn");
  }

  const handleChange = async (event) => {
    const {name, value} = event.target;

    let updatedErrors = errors

    switch (name) {
      case 'password': 
        if (value.length < 5) {
          updatedErrors.password = 'The password must be 5 characters length!'
        } else {
          updatedErrors.password = '';
        }
        setPassword(value);
        break;
      case 'confirmPassword':
        if (value !== password) {
          updatedErrors.confirmPassword = 'The confirm must be equal with password field value!'
        } else {
          updatedErrors.confirmPassword = '';
        }
        setConfirmPassword(value);
        break;
      default:
        break;
    }
    setSendStatus(true)
    for (let item in updatedErrors) {
      if (updatedErrors[item]) setSendStatus(false)
    }
    setErrors({
      ...updatedErrors
    })
  };

  const changePassword = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const elements = {
      code: code,
      password: data.get('password')
    }
    try {
      const response = await apiReset(elements);
      if (response.data) {
        if (response.status === 200) {
          setStatus(false);
          setReseted(true);
        } else {
          setStatus(response.status);
        }
      } else {
        if (response.status) {
          setStatus(response.status);
        } else {
          setStatus("networkError");
        }
      }
    } catch(error) {
      setStatus(909);
    }
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create new password
          </Typography>
          <Box component="form" noValidate onSubmit={changePassword} sx={{ mt: 3 }}>
          { reseted ?
            <>
              <h3>Your password is changed</h3>          
            </>
            :
            <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={password} onChange={handleChange}  
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={confirmPassword} onChange={handleChange}  
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>

            <div className="errorMessage">
              {errors.password && <span>{errors.password}</span>}
              {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
            </div>

            <Button
              disabled={!sendStatus}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change password
            </Button>
            </>
          }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  )
}

/*
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { apiReset } from '../api/auth.api';

const Reset = ({setStatus}) => {
  const [sendStatus, setSendStatus] = useState(false);
  const [reseted, setReseted] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    password: 'Choose a strong password!',
    confirmPassword: 'Please, confirm the password before send form data!',
  });

  const [ urlParams ] = useSearchParams();
  const code = urlParams.get('code');

  let navigate = useNavigate();
  
  const redirect = () => {
    navigate("/signIn");
  }

  const handleChange = async (event) => {
    const {name, value} = event.target;

    let updatedErrors = errors

    switch (name) {
      case 'password': 
        if (value.length < 5) {
          updatedErrors.password = 'The password must be 5 characters length!'
        } else {
          updatedErrors.password = '';
        }
        setPassword(value);
        break;
      case 'confirmPassword':
        if (value !== password) {
          updatedErrors.confirmPassword = 'The confirm must be equal with password field value!'
        } else {
          updatedErrors.confirmPassword = '';
        }
        setConfirmPassword(value);
        break;
      default:
        break;
    }
    setSendStatus(true)
    for (let item in updatedErrors) {
      if (updatedErrors[item]) setSendStatus(false)
      // console.log(`${item}: ${updatedErrors[item]}`);
    }
    setErrors({
      ...updatedErrors
    })
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await apiReset(e.target.elements);
      if (response.data) {
        if (response.status === 200) {
          setStatus(false);
          setReseted(true);
        } else {
          setStatus(response.status);
        }
      } else {
        if (response.status) {
          setStatus(response.status);
        } else {
          setStatus("networkError");
        }
      }
    } catch(error) {
      setStatus(909);
    }
  }

  return (
    <>
      <h2>Change password</h2>
      { reseted ?
        <>
          <h3>Your password is changed</h3>          
        </>
        :
        <>
          <form onSubmit={changePassword} id="contactForm">
            <input type="hidden" name="code" value={code} />
            <div className="errorMessage">{errors.password || " "}</div>
            <TextField type="password" id="password" name="password" label="Password " variant="outlined" value={password} onChange={handleChange}  className="formField" />

            <div className="errorMessage">{errors.confirmPassword || " "}</div>
            <TextField type="password" id="confirmPassword" name="confirmPassword" label="Confirm password " variant="outlined" value={confirmPassword} onChange={handleChange}  className="formField" />

            <div className="errorMessage"> </div>
            <Button variant="outlined" type="submit" disabled={!sendStatus}>Change password</Button>

          </form>
        </>
      }
    </>
  );
};

export default Reset;
*/
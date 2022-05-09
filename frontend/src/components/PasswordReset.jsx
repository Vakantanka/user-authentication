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
import { useNavigate } from 'react-router-dom';
import { apiSignIn, apiFindUserByEmail, apiPasswordReset } from '../api/auth.api';

const theme = createTheme();

export default function PasswordReset({setStatus}) {
  const [sendStatus, setSendStatus] = useState(false);
  const [reseted, setReseted] = useState(false);

  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    email: 'Please type your email address to request password reset!',
 });

  let navigate = useNavigate();

  const handleChange = async (event) => {
    const {name, value} = event.target;
    const regexEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;

    let updatedErrors = errors

    switch (name) {
      case 'email': 
        if (!regexEmail.test(value)) {
          updatedErrors.email = 'Wrong e-mail address!'
        } else {
          let answer = await apiFindUserByEmail(name,value)
          if ( answer === 204 ) {
            updatedErrors.email = ''
          } else {
            updatedErrors.email = 'Unknown credential data.';
          }
        }
        setEmail(value);
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

  const passwordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPasswordReset(e.target.elements);
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
        { reseted ?
          <p>We have sent an email to {email} with the password resetting code. Check your email, and follow the instructions!</p>
        :
          <>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Password Reset
          </Typography>
          <Box component="form" onSubmit={passwordReset} noValidate sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                value={email} onChange={handleChange} 
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <div className="errorMessage">
              {errors.password && <span>{errors.password}</span>}
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!sendStatus}
            >
              Reset password
            </Button>
          </Box>
          </>
        } 
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}

/*
import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { apiFindUserByEmail, apiPasswordReset } from '../api/auth.api';

const PasswordReset = ({setStatus}) => {
  const [sendStatus, setSendStatus] = useState(false);
  const [reseted, setReseted] = useState(false);

  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    email: 'Please type your email address to request password reset!',
 });

  let navigate = useNavigate();

  const handleChange = async (event) => {
    const {name, value} = event.target;
    const regexEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;

    let updatedErrors = errors

    switch (name) {
      case 'email': 
        if (!regexEmail.test(value)) {
          updatedErrors.email = 'Wrong e-mail address!'
        } else {
          let answer = await apiFindUserByEmail(name,value)
          if ( answer === 204 ) {
            updatedErrors.email = ''
          } else {
            updatedErrors.email = 'Unknown credential data.';
          }
        }
        setEmail(value);
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

  const passwordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPasswordReset(e.target.elements);
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
    <h2>Password request</h2>
    { reseted ?
      <p>We have sent an email to {email} with the password resetting code. Check your email, and follow the instructions!</p>
    :
    <form onSubmit={passwordReset} id="contactForm">
      <div className="errorMessage">{errors.email || " "}</div>
      <TextField type="email" id="email" name="email" label="Email " variant="outlined" value={email} onChange={handleChange} required className="formField TextField" />

      <div className="errorMessage"> </div>
      <Button variant="outlined" type="submit" disabled={!sendStatus}>Send request</Button>

    </form>
    }
    </>
  );
};

export default PasswordReset;
*/
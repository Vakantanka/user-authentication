import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSearchParams, useNavigate } from "react-router-dom";

import { apiReset } from '../api/auth.api';

export default function CreateNewPassword({setStatus}) {
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
    </>
  )
}

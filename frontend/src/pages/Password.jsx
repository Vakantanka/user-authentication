import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import { 
  apiUpdatePassword,
} from '../api/auth.api';

export default function Password({setStatus}) {
  const [sendStatus, setSendStatus] = useState(false);

  const [updated, setUpdated] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    oldPassword: 'Type your actual password!',
    newPassword: 'Fill out the new password field!',
    confirmPassword: 'Confirm your new password!',
  });

  const handleChange = async (event) => {
    const {name, value} = event.target;

    let updatedErrors = errors

    switch (name) {
      case 'oldPassword': 
        if (value.length < 5) {
          updatedErrors.oldPassword = 'The password must be 5 characters length!'
        } else {
          updatedErrors.oldPassword = '';
        }
        setOldPassword(value);
        break;
      case 'newPassword': 
        if (value.length < 5) {
          updatedErrors.newPassword = 'The password must be 5 characters length!'
        } else {
          updatedErrors.newPassword = '';
        }
        setNewPassword(value);
        break;
      case 'confirmPassword':
        if (value !== newPassword) {
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

  const updatePassword = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const elements = {
      oldPassword: data.get('oldPassword'),
      newPassword: data.get('newPassword')
    }
    try {
      const response = await apiUpdatePassword(elements);
      if (response.data) {
        if (response.status === 200) {
          setOldPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setUpdated(true);
        } else {
          setOldPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setStatus(response.status);
        }
      } else {
        if (response.status) {
          setOldPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setStatus(response.status);
        } else {
          setOldPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setStatus("networkError");
        }
      }
    } catch(error) {
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setStatus(909);
    }
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Password { updated && "updated"}
        </Typography>

        <Box component="form" noValidate onSubmit={updatePassword} sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                value={oldPassword} onChange={handleChange}  
                required
                fullWidth
                name="oldPassword"
                label="Old password"
                type="password"
                id="oldPassword"
                autoComplete="oldPassword"
                variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={newPassword} onChange={handleChange}  
                required
                fullWidth
                name="newPassword"
                label="New password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
                variant="standard"
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
                variant="standard"
                />
            </Grid>
            <Grid item xs={6}>
              <div className="errorMessage">
                {errors.oldPassword && <span>{errors.oldPassword}</span>}
                {errors.newPassword && <span>{errors.newPassword}</span>}
                {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
              </div>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              { updated ? 
                <>
                <Button 
                  variant="outlined"
                  disabled="true"
                >
                  Updated
                </Button>
                </>
                :
                <Button 
                  type="submit"
                  variant="contained"
                  disabled={!sendStatus}
                >
                  Update
                </Button>
              }
              </Box>
            </Grid>
          </Grid>
        </Box>
     </Paper>
    </Container>

  );
}
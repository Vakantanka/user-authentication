import * as React from 'react';
import { useState} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
export default function AccountForm({
  firstName, 
  lastName,
  email,
  username,
  handleChange,
  update,
  sendStatus,
  updated,
  initialData
}) {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Account
      </Typography>
      <Box component="form" noValidate onSubmit={update} sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={firstName} onChange={handleChange}
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="firstName"
              variant="standard"
              disabled={updated}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={lastName} onChange={handleChange}
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="lastName"
              variant="standard"
              disabled={updated}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={email} onChange={handleChange}
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="standard"
              disabled={updated}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={username} onChange={handleChange}
              required
              id="username"
              name="username"
              label="Username"
              fullWidth
              autoComplete="username"
              variant="standard"
              disabled={updated}
            />
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
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
                variant="outlined"
                disabled={!sendStatus}
              >
                Update
              </Button>
            }
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
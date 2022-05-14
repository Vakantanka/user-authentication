import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AccountForm({
  firstName, 
  lastName,
  email,
  username,
  handleChange
}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Account data
      </Typography>
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
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
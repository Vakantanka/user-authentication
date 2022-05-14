import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function PasswordForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Change password
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="oldPassword"
            name="oldPassword"
            label="Old password"
            fullWidth
            autoComplete="oldPassword"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="newPassword"
            name="newPassword"
            label="New password"
            fullWidth
            autoComplete="newPassword"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="confirmPassword"
            name="conformPassword"
            label="Confirm new password"
            fullWidth
            autoComplete="newPassword"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined">
            Update
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PersonalForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal informations
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="company"
            name="company"
            label="Company"
            fullWidth
            autoComplete="company"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="website"
            name="website"
            label="Website"
            fullWidth
            autoComplete="website"
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
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function PersonalForm({
  company, 
  website,
  handleChange,
  update,
  sendStatus,
  updated,
  initialData
}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal informations
      </Typography>
      <Box component="form" noValidate onSubmit={update} sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              value={company} onChange={handleChange}
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
              value={website} onChange={handleChange}
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
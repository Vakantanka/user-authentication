import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function AddressForm({
  street, 
  city,
  state,
  zipcode,
  country,
  phone,
  handleChange,
  update,
  sendStatus,
  updated,
  initialData
}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Address and phone
      </Typography>
      <Box component="form" noValidate onSubmit={update} sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              value={street} onChange={handleChange}
              id="street"
              name="street"
              label="Street"
              fullWidth
              autoComplete="Street"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={city} onChange={handleChange}
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="City"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={state} onChange={handleChange}
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={zipcode} onChange={handleChange}
              id="zipcode"
              name="zipcode"
              label="Zip / Postal code"
              fullWidth
              autoComplete="Postal code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={country} onChange={handleChange}
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="Country"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={phone} onChange={handleChange}
              id="phone"
              name="phone"
              label="Phone number"
              fullWidth
              autoComplete="phone"
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
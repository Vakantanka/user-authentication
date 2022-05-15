import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { 
  apiGetProfileData,
  apiUpdateProfile, 
} from '../api/auth.api';

export default function Profile({setStatus}) {
  const [sendStatus, setSendStatus] = useState(false);

  const [updated, setUpdated] = useState(false);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");

  const [errors, setErrors] = useState({
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
    website: '',
    company: ''
  });

  const handleChange = async (event) => {
    const {name, value} = event.target;
    const regexPhone = /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
    const regexURL = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

    let updatedErrors = errors

    switch (name) {
      case 'street':
        setStreet(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'zipcode':
        setZipcode(value);
        break;
      case 'country':
        setCountry(value);
        break;
      case 'phone': 
        if (!regexPhone.test(value)) {
          updatedErrors.phone = 'Use numbers only!';
        } else {
          updatedErrors.phone = '';
        }
        setPhone(value);
        break;
      case 'website': 
        if (!regexURL.test(value)) {
          updatedErrors.website = 'Invalid URL!';
        } else {
          updatedErrors.website = '';
        }
        setWebsite(value);
        break;
      case 'company':
          setCompany(value);
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

  const updateProfile = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const elements = {
      address: {
        street: data.get('street'),
        city: data.get('city'),
        state: data.get('state'),
        zipcode: data.get('zipcode'),
        country: data.get('country'),
      },
      phone: data.get('phone'),
      company: data.get('company'),
      website: data.get('website'),
    }
    try {
      const response = await apiUpdateProfile(elements);
      if (response.data) {
        if (response.status === 200) {
          setUpdated(true)
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

  useEffect(() => {
    const init = async () => {
      try {
        const response = await apiGetProfileData();
        if (response.data) {
          if (response.status === 200) {
            setStatus(false);
            setStreet(response.data.address.street);
            setCity(response.data.address.city);
            setState(response.data.address.state);
            setZipcode(response.data.address.zipcode);
            setCountry(response.data.address.country);
            setPhone(response.data.phone);
            setWebsite(response.data.website);
            setCompany(response.data.company);
            return true;
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
    init();
  }, [])

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Profile  { updated && "updated" }
        </Typography>
        <Box component="form" noValidate onSubmit={updateProfile} sx={{ mt: 1 }}>
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
                disabled={updated}
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
                disabled={updated}
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
                disabled={updated}
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
                disabled={updated}
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
                disabled={updated}
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
                disabled={updated}
              />
            </Grid>
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
                disabled={updated}
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
                disabled={updated}
              />
            </Grid>
            <Grid item xs={6}>
              <div className="errorMessage">
                {errors.street && <span>{errors.street}</span>}
                {errors.city && <span>{errors.city}</span>}
                {errors.state && <span>{errors.state}</span>}
                {errors.zipcode && <span>{errors.zipcode}</span>}
                {errors.country && <span>{errors.country}</span>}
                {errors.phone && <span>{errors.phone}</span>}
                {errors.company && <span>{errors.company}</span>}
                {errors.website && <span>{errors.website}</span>}
              </div>
            </Grid>
            <Grid item xs={6}>
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
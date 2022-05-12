import React, { useState, useEffect } from 'react'
import { apiGetProfileData } from '../api/auth.api';
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

import { apiUpdateProfile, apiFindUserByEmail, apiFindUserByUsername } from '../api/auth.api';

const Profile = ({setStatus}) => {
  const [sendStatus, setSendStatus] = useState(false);
  const [updated, setUpdated] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zipcode: '',
    website: '',
    company: ''
  });

  const handleChange = async (event) => {
    const {name, value} = event.target;
    const regexEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
    const regexUsername = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    const regexPhone = /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
    const regexURL = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

    let updatedErrors = errors

    switch (name) {
      case 'firstName': 
        if (value.length < 5) {
          updatedErrors.firstName = 'The name must be 5 characters length!'
        } else {
          updatedErrors.firstName = '';
        }
        setFirstName(value);
        break;
      case 'lastName': 
        setLastName(value);
        break;
      case 'username': 
        if (!regexUsername.test(value)) {
          updatedErrors.username = 'The username must be 8-20 aplhanumeric characters!';
        } else {
          let answer = await apiFindUserByUsername(name,value)
          if ( answer === 204 ) {
            updatedErrors.username = 'Reserved username.'
          } else {
            updatedErrors.username = '';
          }
        }
        setUsername(value);
        break;
      case 'email':
        if (!regexEmail.test(value)) {
          updatedErrors.email = 'Wrong e-mail address!'
        } else {
          let answer = await apiFindUserByEmail(name,value)
          if ( answer === 204 ) {
            updatedErrors.email = 'Reserved email address.'
          } else {
            updatedErrors.email = '';
          }
        }
        setEmail(value);
        break;
      case 'phone': 
        if (!regexPhone.test(value)) {
          updatedErrors.phone = 'Use numbers only!';
        } else {
          updatedErrors.phone = '';
        }
        setPhone(value);
        break;
      case 'street':
        break;
      case 'city':
        break;
      case 'zipcode':
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
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      username: data.get('username'),
      email: data.get('email'),
      phone: data.get('phone'),
      street: data.get('street'),
      city: data.get('city'),
      zipcode: data.get('zipcode'),
      website: data.get('website'),
      company: data.get('company')
    }
    try {
      const response = await apiUpdateProfile(elements);
      if (response.data) {
        if (response.status === 200) {
          setFirstName("");
          setLastName("");
          setUsername("");
          setEmail("");
          setUpdated(true);
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
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setUsername(response.data.username);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setStreet(response.data.address.street);
            setCity(response.data.address.city);
            setZipcode(response.data.address.zipcode);
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
        { updated ?
          <>
            <h2>Congratulations!</h2>
            <p>You have successfully updated your profile.</p>
          </>
        :
        <>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile data
          </Typography>
          <Box component="form" noValidate onSubmit={updateProfile} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={firstName} onChange={handleChange} 
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastName} onChange={handleChange} 
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={username} onChange={handleChange} 
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  value={phone} onChange={handleChange} 
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={street} onChange={handleChange} 
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  name="street"
                  autoComplete="street"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={city} onChange={handleChange} 
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={zipcode} onChange={handleChange} 
                  required
                  fullWidth
                  id="zipcode"
                  label="ZIP code"
                  name="zipcode"
                  autoComplete="zipcode"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={website} onChange={handleChange} 
                  required
                  fullWidth
                  id="website"
                  label="Web site"
                  name="website"
                  autoComplete="website"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={company} onChange={handleChange} 
                  required
                  fullWidth
                  id="company"
                  label="Company"
                  name="company"
                  autoComplete="company"
                />
              </Grid>
            </Grid>

            <div className="errorMessage">
              {errors.firstName && <span>{errors.firstName}</span>}
              {errors.username && <span>{errors.username}</span>}
              {errors.email && <span>{errors.email}</span>}
            </div>

            <Button
              disabled={!sendStatus}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
          </Box>
         </>
        }
        </Box>
      </Container>
    </>
  )
}

export default Profile
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
  apiFindAnotherUserByEmail, 
  apiFindAnotherUserByUsername, 
  apiGetProfileData,
  apiUpdateAccount,
} from '../api/auth.api';

export default function Account({setStatus}) {
  const [sendStatus, setSendStatus] = useState(false);

  const [updated, setUpdated] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
  });

  const handleChange = async (event) => {
    const {name, value} = event.target;
    const regexEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
    const regexUsername = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

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
          let answer = await apiFindAnotherUserByUsername(name,value)
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
          let answer = await apiFindAnotherUserByEmail(name,value)
          if ( answer === 204 ) {
            updatedErrors.email = 'Reserved email address.'
          } else {
            updatedErrors.email = '';
          }
        }
        setEmail(value);
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

  const updateAccount = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const elements = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      username: data.get('username'),
      email: data.get('email'),
    }
    try {
      const response = await apiUpdateAccount(elements);
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
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setUsername(response.data.username);
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
          Account { updated && "updated"}
        </Typography>

        <Box component="form" noValidate onSubmit={updateAccount} sx={{ mt: 1 }}>
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
              <div className="errorMessage">
                {errors.firstName && <span>{errors.firstName}</span>}
                {errors.lastName && <span>{errors.lastName}</span>}
                {errors.username && <span>{errors.username}</span>}
                {errors.email && <span>{errors.email}</span>}
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
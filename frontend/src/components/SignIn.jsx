import * as React from 'react';
import { useState } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { apiSignIn } from '../api/auth.api';

const theme = createTheme();

export default function SignIn({setStatus, loggedIn, setLoggedIn}) {
  const [sendStatus, setSendStatus] = useState(false);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    credential: 'Please type your username or email address to login!',
    password: 'Please type your password!',
  });

  let navigate = useNavigate();

  const handleChange = (event) => {
    const {name, value} = event.target;
    const regexEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
    const regexUsername = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

    let updatedErrors = errors

    switch (name) {
      case 'credential': 
        if (value.length < 5) {
          updatedErrors.credential = 'The credential must be 5 characters length!'
        } else {
          if (value.includes('@') && !regexEmail.test(value)) {
            updatedErrors.credential = 'Wrong email address!'
          } else if (!regexUsername.test(value)) {
            updatedErrors.credential = 'The username must be 8-20 characters length! (aplhanumeric characters or . or _ allowed)'
          }
          updatedErrors.credential = '';
        }
        setCredential(value);
        break;
      case 'password': 
        if (value.length < 5) {
          updatedErrors.password = 'The password must be 5 characters length!'
        } else {
          updatedErrors.password = '';
        }
        setPassword(value);
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

  const signIn = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const elements = {
      credential: data.get('credential'),
      password: data.get('password')
    }
    try {
      const response = await apiSignIn(elements);
      if (response.data) {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          setStatus(false);
          setLoggedIn(true);
          setPassword("");
          navigate("/");
          return true;
        } else {
          setStatus(response.status);
        }
      } else {
        console.log(response)
        if (response.status) {
          setStatus(response.status);
        } else {
          setStatus("networkError");
        }
      }
    } catch(error) {
      setStatus(909);
      setPassword("");
    }
  }

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={signIn} noValidate sx={{ mt: 1 }}>
            <TextField
              value={credential} onChange={handleChange} 
              margin="normal"
              required
              fullWidth
              id="credential"
              label="Username or Email Address"
              name="credential"
              autoComplete="credential"
              autoFocus
            />
            <TextField
              value={password} onChange={handleChange}  
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <div className="errorMessage">
              {errors.credential && <span>{errors.credential}</span>}
              {errors.password && <span>{errors.password}</span>}
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!sendStatus}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="passwordReset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
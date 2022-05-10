import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Homepage from './components/Homepage';
import Confirm from './components/Confirm';
import PasswordResetForm from './components/PasswordResetForm';
import PasswordChange from './components/PasswordChange';

import Message from './components/Message';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import red from '@mui/material/colors/red';
import pink from '@mui/material/colors/pink';
import purple from '@mui/material/colors/purple';
import deepPurple from '@mui/material/colors/deepPurple';
import indigo from '@mui/material/colors/indigo';
import blue from '@mui/material/colors/blue';
import lightBlue from '@mui/material/colors/lightBlue';
import cyan from '@mui/material/colors/cyan';
import teal from '@mui/material/colors/teal';
import green from '@mui/material/colors/green';
import lightGreen from '@mui/material/colors/lightGreen';
import lime from '@mui/material/colors/lime';
import yellow from '@mui/material/colors/yellow';
import amber from '@mui/material/colors/amber';
import orange from '@mui/material/colors/orange';
import deepOrange from '@mui/material/colors/deepOrange';
import brown from '@mui/material/colors/brown';
import grey from '@mui/material/colors/grey';
import blueGrey from '@mui/material/colors/blueGrey';

const theme = createTheme({
  palette: {
    primary: purple,
    secondary: deepOrange
  },
});

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [status, setStatus] = useState(false);
  
  const signOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setStatus(false);
  }

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://metaflora.hu/">
          MetaFlóra
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  function StickyFooter() {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // minHeight: '100vh',
          width: '100vw',
          position: 'absolute',
          bottom: '0'
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Copyright />
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar signOut={signOut} loggedIn={loggedIn} />
      { status && <Message status={status} setStatus={setStatus} /> }
      <Routes>
        <Route path="/" element={
          <Homepage 
            loggedIn={loggedIn} 
            setStatus={setStatus}
          />}
        />
        <Route
          path="signIn"
          element={
            <SignIn
              setStatus={setStatus}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route
          path="passwordResetForm"
          element={
            <PasswordResetForm
              setStatus={setStatus}
            />
          }
        />
        <Route
          path="reset"
          element={
            <PasswordChange
              setStatus={setStatus}
            />
          }
        />
        <Route
          path="signUp"
          element={
            <SignUp setStatus={setStatus} />
          }
        />
        <Route
          path="confirm"
          element={
            <Confirm setStatus={setStatus} />
          }
        />
      </Routes>
      <StickyFooter />
    </ThemeProvider>
  );
}

export default App;

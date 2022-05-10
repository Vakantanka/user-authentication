import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Homepage from './components/Homepage';
// import Header from './components/Header';
import Confirm from './components/Confirm';
import PasswordReset from './components/PasswordReset';
import Reset from './components/Reset';

// import { apiSignOut } from './api/nogoogleauth.api';
import Message from './components/Message';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import purple from '@mui/material/colors/purple';

const theme = createTheme({
  palette: {
    primary: purple,
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
        {/* <Header signOut={signOut} loggedIn={loggedIn} /> */}
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
          path="passwordReset"
          element={
            <PasswordReset
              setStatus={setStatus}
            />
          }
        />
        <Route
          path="reset"
          element={
            <Reset
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

import React, { useState } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiConfirm } from '../api/auth.api';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Confirm = ({ setStatus }) => {
  const [confirmed, setConfirmed] = useState(false);

  const [ urlParams ] = useSearchParams()
  const code = urlParams.get('code');

  let navigate = useNavigate();
  
  const redirect = () => {
    navigate("/signIn");
  }
  const confirm = async () => {
    try {
      const response = await apiConfirm(code);
      if (response.data) {
        if (response.status === 200) {
          setConfirmed(true);
          setStatus("confirmed");
          redirect();
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
    } catch (error) {
      setStatus(909);
    }
  }

  confirm();

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
      <h2>Confirmation</h2>
      { confirmed && 
        <Button variant="outlined" onClick={redirect}>Sign In</Button>
      }
      </Box>
    </Container>
    </>
  )
}

export default Confirm
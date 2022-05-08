import React, { useState } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiConfirm } from '../api/auth.api';
import Button from '@mui/material/Button';

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
    } catch (error) {
      setStatus(909);
    }
  }

  confirm();

  return (
    <>
      <h2>Confirmation</h2>
      { confirmed && 
        <Button variant="outlined" onClick={redirect}>Sign In</Button>
      }
    </>
  )
}

export default Confirm
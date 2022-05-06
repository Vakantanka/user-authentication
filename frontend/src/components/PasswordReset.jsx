import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { apiFindUserByEmail, apiPasswordReset } from '../api/nogoogleauth.api';

const PasswordReset = ({setStatus}) => {
  const [sendStatus, setSendStatus] = useState(false);
  const [reseted, setReseted] = useState(false);

  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    email: 'Please type your email address to request password reset!',
 });

  let navigate = useNavigate();

  const handleChange = async (event) => {
    const {name, value} = event.target;
    const regexEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;

    let updatedErrors = errors

    switch (name) {
      case 'email': 
        if (!regexEmail.test(value)) {
          updatedErrors.email = 'Wrong e-mail address!'
        } else {
          let answer = await apiFindUserByEmail(name,value)
          if ( answer === 204 ) {
            updatedErrors.email = ''
          } else {
            updatedErrors.email = 'Unknown credential data.';
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

  const passwordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPasswordReset(e.target.elements);
      if (response.data) {
        if (response.status === 200) {
          setStatus(false);
          setReseted(true);
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

  return (
    <>
    <h2>Password request</h2>
    { reseted ?
      <p>We have sent an email to {email} with the password resetting code. Check your email, and follow the instructions!</p>
    :
    <form onSubmit={passwordReset} id="contactForm">
      <div className="errorMessage">{errors.email || " "}</div>
      <TextField type="email" id="email" name="email" label="Email " variant="outlined" value={email} onChange={handleChange} required className="formField TextField" />

      <div className="errorMessage"> </div>
      <Button variant="outlined" type="submit" disabled={!sendStatus}>Send request</Button>

    </form>
    }
    </>
  );
};

export default PasswordReset;

import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { apiSignIn } from '../api/nogoogleauth.api';

const SignIn = ({setStatus, loggedIn, setLoggedIn}) => {
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
      // console.log(`${item}: ${updatedErrors[item]}`);
    }
    setErrors({
      ...updatedErrors
    })
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const response = await apiSignIn(e, credential, password);
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

  const redirectToPasswordReset = () => {
    navigate("/passwordReset");
  }

  return (
    <>
      <h2>Sign In</h2>
      <form onSubmit={signIn} id="contactForm">
        <div className="errorMessage">{errors.credential || " "}</div>
        <TextField type="text" id="credential" name="credential" label="Credential " variant="outlined" value={credential} onChange={handleChange} required className="formField TextField" />

        <div className="errorMessage">{errors.password || " "}</div>
        <TextField type="password" id="password" name="password" label="Password " variant="outlined" value={password} onChange={handleChange}  className="formField" />

        <div className="errorMessage"> </div>
        <Button variant="outlined" type="submit" disabled={!sendStatus}>Sign In</Button>

        <div className="errorMessage"> </div>
        <Button variant="text" onClick={redirectToPasswordReset}>Reset password</Button>
      </form>
      </>
  );
};

export default SignIn;

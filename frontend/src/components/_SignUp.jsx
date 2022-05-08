import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { apiSignUp, apiFindUserByEmail, apiFindUserByUsername } from '../api/nogoogleauth.api';

const SignUp = ({setStatus}) => {
  const [sendStatus, setSendStatus] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    name: 'Please, fill out the name field!',
    username: 'Please, fill out the username field!',
    email: 'Please, fill out the email field!',
    password: 'Choose a strong password!',
    confirmPassword: 'Please, confirm the password before send form data!',
  });

  const handleChange = async (event) => {
    const {name, value} = event.target;
    const regexEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
    const regexUsername = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

    let updatedErrors = errors

    switch (name) {
      case 'name': 
        if (value.length < 5) {
          updatedErrors.name = 'The name must be 5 characters length!'
        } else {
          updatedErrors.name = '';
        }
        setName(value);
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
      case 'password': 
        if (value.length < 5) {
          updatedErrors.password = 'The password must be 5 characters length!'
        } else {
          if (value === username) {
            updatedErrors.password = 'Password cannot match username';
          } else {
            updatedErrors.password = '';
          }
        }
        setPassword(value);
        break;
      case 'confirmPassword':
        if (value !== password) {
          updatedErrors.confirmPassword = 'The confirm must be equal with password field value!'
        } else {
          updatedErrors.confirmPassword = '';
        }
        setConfirmPassword(value);
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

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await apiSignUp(e.target.elements);
      if (response.data) {
        if (response.status === 200) {
          setName("");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setSignedUp(true);
        } else {
          setStatus(response.status);
          setPassword("");
          setConfirmPassword("");
        }
      } else {
        if (response.status) {
          setStatus(response.status);
          setPassword("");
          setConfirmPassword("");
        } else {
          setStatus("networkError");
          setPassword("");
          setConfirmPassword("");
        }
      }
    } catch(error) {
      setStatus(909);
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <>
    { signedUp ?
      <section>
        <h2>Congratulations!</h2>
        <p>You have successfully registered the site. Please, verify your email to confirm your registration.</p>
      </section>
    :
      <>
      <h2>Sign Up</h2>
      <form onSubmit={signUp} id="contactForm">
        <div className="errorMessage">{errors.name || " "}</div>
        <TextField type="text" id="name" name="name" label="Name " variant="outlined" value={name} onChange={handleChange} required className="formField TextField" />

        <div className="errorMessage">{errors.username  || " "}</div>
        <TextField type="text" id="username" name="username" label="Username " variant="outlined" value={username} onChange={handleChange} required className="formField TextField" />

        <div className="errorMessage">{errors.email || " "}</div>
        <TextField type="email" id="email" name="email" label="Email " variant="outlined" value={email} onChange={handleChange} required className="formField" />

        <div className="errorMessage">{errors.password || " "}</div>
        <TextField type="password" id="password" name="password" label="Password " variant="outlined" value={password} onChange={handleChange}  className="formField" />

        <div className="errorMessage">{errors.confirmPassword || " "}</div>
        <TextField type="password" id="confirmPassword" name="confirmPassword" label="Confirm password " variant="outlined" value={confirmPassword} onChange={handleChange}  className="formField" />

        <div className="errorMessage"> </div>
        <Button variant="outlined" type="submit" disabled={!sendStatus}>Sign Up</Button>
      </form>
      </>
    }
    </>
  );
};

export default SignUp;
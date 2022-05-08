import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { apiReset } from '../api/auth.api';

const Reset = ({setStatus}) => {
  const [sendStatus, setSendStatus] = useState(false);
  const [reseted, setReseted] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    password: 'Choose a strong password!',
    confirmPassword: 'Please, confirm the password before send form data!',
  });

  const [ urlParams ] = useSearchParams();
  const code = urlParams.get('code');

  let navigate = useNavigate();
  
  const redirect = () => {
    navigate("/signIn");
  }

  const handleChange = async (event) => {
    const {name, value} = event.target;

    let updatedErrors = errors

    switch (name) {
      case 'password': 
        if (value.length < 5) {
          updatedErrors.password = 'The password must be 5 characters length!'
        } else {
          updatedErrors.password = '';
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
      // console.log(`${item}: ${updatedErrors[item]}`);
    }
    setErrors({
      ...updatedErrors
    })
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await apiReset(e.target.elements);
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
      <h2>Change password</h2>
      { reseted ?
        <>
          <h3>Your password is changed</h3>          
        </>
        :
        <>
          <form onSubmit={changePassword} id="contactForm">
            <input type="hidden" name="code" value={code} />
            <div className="errorMessage">{errors.password || " "}</div>
            <TextField type="password" id="password" name="password" label="Password " variant="outlined" value={password} onChange={handleChange}  className="formField" />

            <div className="errorMessage">{errors.confirmPassword || " "}</div>
            <TextField type="password" id="confirmPassword" name="confirmPassword" label="Confirm password " variant="outlined" value={confirmPassword} onChange={handleChange}  className="formField" />

            <div className="errorMessage"> </div>
            <Button variant="outlined" type="submit" disabled={!sendStatus}>Change password</Button>

          </form>
        </>
      }
    </>
  );
};

export default Reset;

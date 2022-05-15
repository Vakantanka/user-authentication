import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountForm from '../components/AccountForm';
import AddressForm from '../components/AddressForm';
import PersonalForm from '../components/PersonalForm';
import PasswordForm from '../components/PasswordForm';

import { 
  apiFindAnotherUserByEmail, 
  apiFindAnotherUserByUsername, 
  apiGetProfileData,
  apiUpdateAccount,
  apiUpdateProfile, 
} from '../api/auth.api';

export default function Checkout({setStatus}) {
  const [activeStep, setActiveStep] = React.useState(0);
  
  const [sendStatus, setSendStatus] = useState(false);

  const [updatedAccount, setUpdatedAccount] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState(false);
  const [updatedPersonal, setUpdatedPersonal] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");

  const [initialData, setInitialData] = useState(false)

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
    website: '',
    company: ''
  });

  const handleChange = async (event) => {
    const {name, value} = event.target;
    const regexEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
    const regexUsername = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    const regexPhone = /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
    const regexURL = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

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
      case 'street':
        setStreet(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'zipcode':
        setZipcode(value);
        break;
      case 'country':
        setCountry(value);
        break;
      case 'phone': 
        if (!regexPhone.test(value)) {
          updatedErrors.phone = 'Use numbers only!';
        } else {
          updatedErrors.phone = '';
        }
        setPhone(value);
        break;
      case 'website': 
        if (!regexURL.test(value)) {
          updatedErrors.website = 'Invalid URL!';
        } else {
          updatedErrors.website = '';
        }
        setWebsite(value);
        break;
      case 'company':
          setCompany(value);
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
          // setStatus(response.status)
          setUpdatedAccount(true)
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

  const updateAddress = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const elements = {
      address: {
        street: data.get('street'),
        city: data.get('city'),
        state: data.get('state'),
        zipcode: data.get('zipcode'),
        country: data.get('country')
      },
      phone: data.get('phone'),
    }
    try {
      const response = await apiUpdateProfile(elements);
      if (response.data) {
        if (response.status === 200) {
          setUpdatedAddress(true)
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

  const updatePersonal = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const elements = {
      company: data.get('company'),
      website: data.get('website'),
    }
    try {
      const response = await apiUpdateProfile(elements);
      if (response.data) {
        if (response.status === 200) {
          setUpdatedPersonal(true)
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

  const steps = ['Account', 'Address', 'Personal', 'Password'];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AccountForm 
          firstName={firstName} 
          lastName={lastName} 
          email={email}
          username={username}
          handleChange={handleChange}
          update={updateAccount}
          sendStatus={sendStatus}
          updated={updatedAccount}
          initialData={initialData}
        />;
      case 1:
        return <AddressForm 
          street={street}
          city={city}
          state={state}
          zipcode={zipcode}
          country={country}
          phone={phone}
          handleChange={handleChange}
          update={updateAddress}
          sendStatus={sendStatus}
          updated={updatedAddress}
          initialData={initialData}
        />;
      case 2:
        return <PersonalForm 
          company={company}
          website={website}
          handleChange={handleChange}
          update={updatePersonal}
          sendStatus={sendStatus}
          updated={updatedPersonal}
          initialData={initialData}
        />;
      case 3:
        return <PasswordForm 
          handleChange={handleChange}
        />;
      default:
        throw new Error('Unknown step');
    }
  }
  
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

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
            setStreet(response.data.address.street);
            setCity(response.data.address.city);
            setState(response.data.address.state);
            setZipcode(response.data.address.zipcode);
            setCountry(response.data.address.country);
            setPhone(response.data.phone);
            setWebsite(response.data.website);
            setCompany(response.data.company);
            setInitialData(response.data);
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
          Profile
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Update
              </Typography>
              <Typography variant="subtitle1">
                Your profile is updated.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                {/* <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                > */}
                  {/* {activeStep === steps.length - 1 ? 'Update profile' : 'Next'} */}
                  {activeStep !== steps.length - 1 && 
                    <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >Next
                  </Button>
                }
              </Box>
              <div className="errorMessage">
                {errors.firstName && <span>{errors.firstName}</span>}
                {errors.username && <span>{errors.username}</span>}
                {errors.email && <span>{errors.email}</span>}
                {errors.password && <span>{errors.password}</span>}
                {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </Container>
);
}
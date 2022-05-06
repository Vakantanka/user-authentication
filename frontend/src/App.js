import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Homepage from './components/Homepage';
import Header from './components/Header';
import Confirm from './components/Confirm';
import PasswordReset from './components/PasswordReset';
import Reset from './components/Reset';

// import { apiSignOut } from './api/nogoogleauth.api';
import Message from './components/Message';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [status, setStatus] = useState(false);
  
  const signOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setStatus(false);
  }
  
  return (
    <>
      <div className="stickyHeader">
        <Header signOut={signOut} loggedIn={loggedIn} />
      </div>
      { status && <Message status={status} setStatus={setStatus} /> }
      <main>
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
      </main>
    </>
  );
}

export default App;

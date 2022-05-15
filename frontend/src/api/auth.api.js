const http = require('axios')
const myBackEndURL = "http://localhost:4000/api";

const apiSignIn = async (credential) => {
  try {
    const response = await http.post(
      myBackEndURL + "/user/signIn",
      {},
      {
        headers: {
          authorization: credential.credential + ":::" + credential.password,
        },
      }
    );
    return (response);
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiSignUp = async (elements) => {
  try {
    const response = await http.post(
      myBackEndURL + "/user/signUp",
      elements,
    );
    return (response);
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiGetContent = async (endpoint) => {
  try {
    const response = await http.get(myBackEndURL + endpoint,
    {
      headers: {
      "x-access-token": localStorage.getItem('token'),
      },
    })
    return (response);
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiFindUserByUsername = async (name,value) => {
  try {
    const object = { username: value }
    const response = await http.post(myBackEndURL + "/user/findUserByUsername",object)
    return response.status;
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiFindUserByEmail = async (name,value) => {
  try {
    const object = { email: value }
    const response = await http.post(myBackEndURL + "/user/findUserByEmail",object)
    return response.status;
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiConfirm = async (code) => {
  try {
    const response = await http.post(
      myBackEndURL + "/user/confirm",
      {code: code}
    );
    return (response);
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiPasswordReset = async (elements) => {
  const { email } = elements;
  let details = {
    email: email.value
  };
  try {
    const response = await http.post(
      myBackEndURL + "/user/passwordReset",
      details,
    );
    return (response);
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiChangePassword = async (elements) => {
  const { password } = elements;
  let details = {
    password: password.value
  };
  try {
    const response = await http.post(
      myBackEndURL + "/user/changePassword",
      details,
    );
    return (response);
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiReset = async (elements) => {
  const { code, password } = elements;
  try {
    const response = await http.post(
      myBackEndURL + "/user/reset",
      {
        code: code,
        password: password
      }
      );
      return (response);
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiCallRestrictedFunction = async () => {
  try {
    const response = await http.post(myBackEndURL + "/content/callRestrictedFunction",
    {},
    {
      headers: {
      "x-access-token": localStorage.getItem('token'),
      },
    })
    return (response);
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiGetProfileData = async () => {
  try {
    const response = await http.get(myBackEndURL + '/user/profile',
    {
      headers: {
      "x-access-token": localStorage.getItem('token'),
      },
    })
    return (response);
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiFindAnotherUserByUsername = async (name,value) => {
  try {
    const object = { username: value }
    const response = await http.post(
      myBackEndURL + "/user/findAnotherUserByUsername",
      object,
      {
        headers: {
        "x-access-token": localStorage.getItem('token'),
        },
      })
    return response.status;
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiFindAnotherUserByEmail = async (name,value) => {
  try {
    const object = { email: value }
    const response = await http.post(
      myBackEndURL + "/user/findAnotherUserByEmail",
      object,
      {
        headers: {
        "x-access-token": localStorage.getItem('token'),
        },
      })
    return response.status;
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiUpdateAccount = async (elements) => {
  try {
    const response = await http.post(
      myBackEndURL + "/user/updateAccount",
      elements,
      {
        headers: {
        "x-access-token": localStorage.getItem('token'),
        }
      }
    );
    return (response);
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiUpdateProfile = async (elements) => {
  try {
    const response = await http.post(
      myBackEndURL + "/user/updateAddress",
      elements,
      {
        headers: {
        "x-access-token": localStorage.getItem('token'),
        }
      }
    );
    return (response);
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

const apiUpdatePassword = async (elements) => {
  try {
    const response = await http.post(
      myBackEndURL + "/user/updatePassword",
      elements,
      {
        headers: {
          "x-access-token": localStorage.getItem('token'),
          }
        }
      );
      return (response);
  } catch (error) {
    if (!error.response) return (error);
    return error.response;
  }
}

module.exports = { 

  apiSignIn, 
  apiSignUp, 
  apiGetContent, 
  apiFindUserByUsername, 
  apiFindUserByEmail, 
  apiConfirm, 
  apiPasswordReset, 
  apiChangePassword, 
  apiReset,
  apiCallRestrictedFunction,
  apiGetProfileData,
  apiFindAnotherUserByUsername,
  apiFindAnotherUserByEmail,
  apiUpdateAccount,
  apiUpdateProfile,
  apiUpdatePassword

}
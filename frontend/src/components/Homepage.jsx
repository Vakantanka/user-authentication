import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGetContent } from '../api/auth.api'

const http = require('axios')

const Homepage = ({ loggedIn, setStatus }) => {
  const [content, setContent] = useState(false);

  const getContent = async (endpoint) => {
    const response = await apiGetContent(endpoint);
    if (response.data) {
      if (response.status === 200) {
        setContent(response.data.content)
      } else {
        setContent(false);
        setStatus(response.status);
      }
    } else {
      if (response.status) {
        setStatus(response.status);
      } else {
        setStatus("networkError");
      }
    }
  };

  return (
    <section className="home">
      { loggedIn ? 
        <>
        <h2>Welcome</h2>
        <button onClick={() => getContent('/private')}>Private content</button>
        </>
        : 
        <>
        </>
      }
      <button onClick={() => getContent('/public')}>Public content</button>
      { content && 
        <section className="content">
          {content}
        </section>
      }
    </section>
  );
};

export default Homepage;
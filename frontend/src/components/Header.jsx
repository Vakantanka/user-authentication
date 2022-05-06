import React from "react";
import { Link } from "react-router-dom";

const Header = ({ signOut, loggedIn }) => {
  return (
    <header>
      <Link to="/" className="link">
        <h1>No-Google auth</h1>
      </Link>
      <nav>
        <ul>
          {loggedIn ? (
            <>
              <li>
                <Link to="/" className="link" onClick={signOut}>Sign Out</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="signIn" className="link">Sign In</Link>
              </li>
              <li>
                <Link to="signUp" className="link">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

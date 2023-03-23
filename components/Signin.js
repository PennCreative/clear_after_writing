/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/void-dom-elements-no-children */
import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (

    <div
      className="signInPage"
    >
      <div className="logInPage">
        <button type="button" className="btn btn-link" onClick={signIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Signin;

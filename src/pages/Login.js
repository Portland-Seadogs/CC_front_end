import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";

import "../styles/login.scss";
import { useState } from "react";
import { Redirect } from "react-router";

const CLIENT_ID =
  "403724919017-pdcv0m7luuo1pu401n6l2vc9v1j12t04.apps.googleusercontent.com";

export default function Login() {
  const [islogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
   
    sessionStorage.clear();
  }, []);

  const login = (response) => {
    // console.log(response)
    if (response.accessToken) {      
      sessionStorage.setItem("token", response.accessToken);
      // console.log(response.accessToken);
      setIsLogin(true);
    }
    
  };

  const handleLoginFail = (response) => {
    console.log(response)    
  };

  if (islogin) {
    return (
      <>
        <Redirect to="/catalog" />
      </>
    );
  } else {
    return (
      <>
        <div className="login-container">
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={login}
            onFailure={handleLoginFail}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
            isSignedIn={false}
          />
        </div>
      </>
    );
  }
}

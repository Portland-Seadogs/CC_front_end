import { useCallback, useEffect } from 'react'
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

import "../styles/login.scss";


const CLIENT_ID = '403724919017-pdcv0m7luuo1pu401n6l2vc9v1j12t04.apps.googleusercontent.com';

export default function Login() {

  useEffect(() => {
    // Update the document title using the browser API
    sessionStorage.clear()
  }, []);

    const history = useHistory();
  
    const login = (response) => {

      if (response.accessToken) {
        sessionStorage.setItem("token", response.accessToken);
        history.push('/catalog');
      }
    };

    // const logout = useCallback(() => {
    //   sessionStorage.clear();
    //   history.push('/');
    // }, [history]);

    const handleLoginFailure = useCallback(response => {        
      alert('Failed to log in');
    }, []);

    // const handleLogoutFailure = useCallback(response => {
    //   alert('Failed to log out')
    // }, []);

    return (
      <>
      <div className="login-container">
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Login'
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
          responseType='code,token'
          isSignedIn={false}
        />
        </div>
      </>
    );
  }
  
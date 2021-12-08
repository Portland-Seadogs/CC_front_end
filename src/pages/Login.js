import { useCallback } from 'react'
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

import "../styles/login.scss";

const CLIENT_ID = '403724919017-pdcv0m7luuo1pu401n6l2vc9v1j12t04.apps.googleusercontent.com';

export default function Login() {

    
    const history = useHistory();
  
    const login = useCallback(response => {
      console.log(response.accessToken);
      if (response.accessToken) {
        sessionStorage.setItem("token", response.accessToken);
        history.push('/catalog');
      }
    }, [history]);

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
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Login to Play!'
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
          responseType='code,token'
          isSignedIn={true}
        />
      </>
    );
  }
  
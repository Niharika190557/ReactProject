import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

function FacebookLoginComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');

  const handleResponse = (response) => {
    if (response.status !== 'unknown') {
      setIsLoggedIn(true);
      setUserName(response.name);
      setUserPicture(response.picture.data.url);
    } else {
      console.log('Login failed');
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <FacebookLogin
          appId="947885170495444"
          autoLoad={false}
          fields="name,email,picture"
          callback={handleResponse}
          onFailure={(error) => console.log('Login Failed:', error)}
        />
      ) : (
        <div>
          <h2>Welcome, {userName}</h2>
          <img src={userPicture} alt="User profile" />
        </div>
      )}
    </>
  );
}

export default FacebookLoginComponent;

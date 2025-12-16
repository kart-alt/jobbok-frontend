import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Box, Typography, Divider } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const GoogleSignIn = ({ onSuccess, onError }) => {
  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      onSuccess({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        provider: 'google'
      });
    } catch (error) {
      onError(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || '743862552891-0kbg1e4jc4jb5pq7h1q8v9q0r1s2t3u4.apps.googleusercontent.com'}>
      <Box sx={{ textAlign: 'center', my: 2 }}>
        <Divider sx={{ my: 2 }}>
          <Typography variant="caption" color="textSecondary">
            OR
          </Typography>
        </Divider>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => onError(new Error('Google login failed'))}
          theme="outline"
          size="large"
          text="signin_with"
        />
      </Box>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;

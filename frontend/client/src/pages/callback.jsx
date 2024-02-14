import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const expiresIn = params.get('expires_in')- 600000; 
    const expiresAt = Date.now() + expiresIn;
    sessionStorage.setItem('access-token', params.get('access-token'));
    sessionStorage.setItem('refresh-token', params.get('refresh-token'));
    sessionStorage.setItem('token_type', params.get('token_type'));
    sessionStorage.setItem('expires_at', expiresAt.toString());

    params.delete('authorization');
    params.delete('refresh_token');

    navigate('/lobby')
  }, [location, navigate]);

  return (
    <div>
      hi
    </div>
  );
};

export default Callback;
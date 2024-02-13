import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const expiresIn = params.get('expires_in')- 600000; 
    const expiresAt = Date.now() + expiresIn;
    const params = new URLSearchParams(location.search);
    localStorage.setItem('access-token', params.get('access-token'));
    localStorage.setItem('refresh-token', params.get('refresh-token'));
    localStorage.setItem('token_type', params.get('token_type'));
    localStorage.setItem('expires_at', expiresAt.toString());

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
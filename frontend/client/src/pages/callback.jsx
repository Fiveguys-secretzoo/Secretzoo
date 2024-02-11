import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    sessionStorage.setItem('authorization', 'Bearer ' + params.get('access-token'));
    sessionStorage.setItem('refresh-token', params.get('refresh-token'));

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
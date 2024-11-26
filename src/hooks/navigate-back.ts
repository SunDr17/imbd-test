import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useNavigateBack = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateBack = useCallback(() => {
    if (location.state?.canGoBack) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }, [location]);

  return { navigateBack };
};

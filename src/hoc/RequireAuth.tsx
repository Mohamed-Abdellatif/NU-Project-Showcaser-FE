import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useToastContext } from '../contexts/ToastContext';

interface RequireAuthProps {
  children: React.ReactNode;
}

/**
 * Higher Order Component that protects routes by checking authentication.
 * If user is not authenticated, redirects to home page.
 * Shows loading state while checking authentication.
 */
const RequireAuth = ({ children }: RequireAuthProps) => {
  const { data: authData, isLoading, isError } = useAuth();
  const { showWarning } = useToastContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // If auth check is complete and user is not authenticated, redirect to home
    if (!isLoading && (!authData || !authData.authenticated)) {
      navigate('/');
      showWarning(t('auth.mustBeLoggedIn'));
    }
  }, [authData, isLoading, showWarning, navigate, t]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // If there's an error or user is not authenticated, don't render children
  // (navigation will happen in useEffect)
  if (isError || !authData || !authData.authenticated) {
    return null;
  }

  // User is authenticated, render children
  return <>{children}</>;
};

export default RequireAuth;


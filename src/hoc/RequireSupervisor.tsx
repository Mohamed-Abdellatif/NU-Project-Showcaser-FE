import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useToastContext } from '../contexts/ToastContext';
import LoadingState from '../components/LoadingState/LoadingState';

interface RequireSupervisorProps {
  children: React.ReactNode;
}

/**
 * Higher Order Component that protects routes by checking if user has supervisor role.
 * If user is not a supervisor or admin, redirects to home page.
 * Shows loading state while checking authentication and role.
 */
const RequireSupervisor = ({ children }: RequireSupervisorProps) => {
  const { data: authData, isLoading, isError } = useAuth();
  const { showWarning } = useToastContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = authData?.user;
  const isSupervisor = user?.role === 'supervisor' || user?.role === 'admin';

  useEffect(() => {
    // If auth check is complete and user is not authenticated, redirect to home
    if (!isLoading && (!authData || !authData.authenticated)) {
      navigate('/');
      showWarning(t('auth.mustBeLoggedIn'));
      return;
    }

    // If auth check is complete and user is authenticated but not a supervisor, redirect to home
    if (!isLoading && authData?.authenticated && !isSupervisor) {
      navigate('/');
      showWarning(t('auth.mustBeSupervisor'));
    }
  }, [authData, isLoading, isSupervisor, showWarning, navigate, t]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingState />;
  }

  // If there's an error or user is not authenticated, don't render children
  // (navigation will happen in useEffect)
  if (isError || !authData || !authData.authenticated) {
    return null;
  }

  // If user is authenticated but not a supervisor, don't render children
  // (navigation will happen in useEffect)
  if (!isSupervisor) {
    return null;
  }

  // User is authenticated and is a supervisor, render children
  return <>{children}</>;
};

export default RequireSupervisor;


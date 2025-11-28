import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useToastContext } from '../contexts/ToastContext';
import { useGetProfileByUserName } from '../hooks/useUser';
import LoadingState from '../components/LoadingState/LoadingState';

interface RequireProfileExistsProps {
  children: React.ReactNode;
}

/**
 * Higher Order Component that checks if a user profile exists before routing.
 * If profile doesn't exist, redirects to home page with a warning.
 * Shows loading state while checking.
 */
const RequireProfileExists = ({ children }: RequireProfileExistsProps) => {
  const { userName } = useParams<{ userName: string }>();
  const { data: profileData, isLoading, isError, error } = useGetProfileByUserName(userName);
  const { showWarning } = useToastContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // If profile check is complete and profile doesn't exist, redirect to home
    if (!isLoading && (isError || !profileData)) {
      navigate('/');
      showWarning(
         t('profile.notFound', { defaultValue: 'Profile not found' })
      );
    }
  }, [profileData, isLoading, isError, error, showWarning, navigate, t]);

  // Show loading state while checking profile
  if (isLoading) {
    return <LoadingState />;
  }

  // If there's an error or profile doesn't exist, don't render children
  // (navigation will happen in useEffect)
  if (isError || !profileData) {
    return null;
  }

  // Profile exists, render children
  return <>{children}</>;
};

export default RequireProfileExists;


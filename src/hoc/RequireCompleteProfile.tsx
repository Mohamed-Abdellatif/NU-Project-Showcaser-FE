import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useToastContext } from '../contexts/ToastContext';
import { useAuth } from '../hooks/useAuth';

interface RequireCompleteProfileProps {
  children: React.ReactNode;
  completedProfile?: boolean;
}

/**
 * Higher Order Component that protects routes by checking authentication.
 * If user is not authenticated, redirects to home page.
 * Shows loading state while checking authentication.
 */
const RequireCompleteProfile = ({ children, completedProfile = false }: RequireCompleteProfileProps) => {
  const { data: authData, isLoading, isError } = useAuth();
  const user = authData?.user;
  const { showWarning, showSuccess } = useToastContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // If auth check is complete and user is not authenticated, redirect to home
    if(isLoading && isError) return;
    if (completedProfile) {
        if (user?.linkedInUrl && user?.githubUrl && user?.universityId && user?.school && user?.major) {
            showSuccess(t('auth.profileCompletedSuccessfully'));
            navigate('/');
          }
    }else{
        if (!user?.linkedInUrl || !user?.githubUrl || !user?.universityId || !user?.school || !user?.major) {
            showWarning(t('auth.mustCompleteProfile'));
            navigate('/complete-profile');
          }
    }
    
  }, [user, navigate, completedProfile, isLoading, isError]);





  // User has completed profile, render children
  return <>{children}</>;
};

export default RequireCompleteProfile;
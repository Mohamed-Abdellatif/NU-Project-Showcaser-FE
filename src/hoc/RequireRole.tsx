import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useToastContext } from '../contexts/ToastContext';
import LoadingState from '../components/LoadingState/LoadingState';

interface RequireRoleProps {
  children: React.ReactNode;
  /**
   * Require user to be authenticated
   */
  auth?: boolean;
  /**
   * Require user to have supervisor role
   */
  supervisor?: boolean;
  /**
   * Require user to have admin role
   */
  admin?: boolean;
}

/**
 * Higher Order Component that protects routes by checking authentication and roles.
 * 
 * @param auth - If true, requires user to be authenticated
 * @param supervisor - If true, requires user to have supervisor role (also requires authentication)
 * @param admin - If true, requires user to have admin role (also requires authentication)
 * 
 * Examples:
 * - <RequireRole auth>{children}</RequireRole> - Just requires authentication
 * - <RequireRole supervisor>{children}</RequireRole> - Requires supervisor role (implicitly requires auth)
 * - <RequireRole admin>{children}</RequireRole> - Requires admin role (implicitly requires auth)
 * - <RequireRole supervisor admin>{children}</RequireRole> - Requires supervisor OR admin role
 */
const RequireRole = ({ 
  children, 
  auth = false, 
  supervisor = false, 
  admin = false 
}: RequireRoleProps) => {
  const { data: authData, isLoading, isError } = useAuth();
  const { showWarning } = useToastContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = authData?.user;
  const userRole = user?.role;

  // Determine if role check is required
  const requiresAuth = auth || supervisor || admin;
  const requiresRole = supervisor || admin;

  // Check if user meets role requirements
  let hasRequiredRole = true;
  if (requiresRole) {
    if (supervisor && admin) {
      // If both supervisor and admin are true, user needs to have either role
      hasRequiredRole = userRole === 'supervisor' || userRole === 'admin';
    } else if (supervisor) {
      // If only supervisor is true, user needs supervisor role (admin also allowed for backwards compatibility)
      hasRequiredRole = userRole === 'supervisor' || userRole === 'admin';
    } else if (admin) {
      // If only admin is true, user needs admin role
      hasRequiredRole = userRole === 'admin';
    }
  }

  useEffect(() => {
    // If auth check is complete and user is not authenticated, redirect to home
    if (!isLoading && requiresAuth && (!authData || !authData.authenticated)) {
      navigate('/');
      showWarning(t('auth.mustBeLoggedIn'));
      return;
    }

    // If auth check is complete and user is authenticated but doesn't have required role
    if (!isLoading && authData?.authenticated && requiresRole && !hasRequiredRole) {
      navigate('/');
      if (supervisor && !admin) {
        showWarning(t('auth.mustBeSupervisor'));
      } else if (admin && !supervisor) {
        showWarning(t('auth.mustBeAdmin'));
      } else {
        showWarning(t('auth.insufficientPermissions'));
      }
    }
  }, [authData, isLoading, requiresAuth, requiresRole, hasRequiredRole, showWarning, navigate, t, supervisor, admin]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingState />;
  }

  // If there's an error or user is not authenticated when auth is required, don't render children
  if (isError || (requiresAuth && (!authData || !authData.authenticated))) {
    return null;
  }

  // If user doesn't have required role, don't render children
  if (requiresRole && !hasRequiredRole) {
    return null;
  }

  // User meets all requirements, render children
  return <>{children}</>;
};

export default RequireRole;

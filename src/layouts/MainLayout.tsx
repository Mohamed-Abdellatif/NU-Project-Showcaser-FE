import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import BugReportButton from '../components/BugReportButton/BugReportButton';

const MainLayout = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="main-layout">
      <header className="main-header">
        <Navbar />
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="main-footer">
        {/* Add your footer content here */}
      </footer>
      
      <BugReportButton />
    </div>
  );
};

export default MainLayout;

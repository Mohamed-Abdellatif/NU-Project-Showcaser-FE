import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import BugReportButton from '../components/BugReportButton/BugReportButton';

const MainLayout = () => {
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

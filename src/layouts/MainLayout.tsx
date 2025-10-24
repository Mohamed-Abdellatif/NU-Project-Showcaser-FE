import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header className="main-header">
        <nav>
          {/* Add your navigation components here */}
        </nav>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="main-footer">
        {/* Add your footer content here */}
      </footer>
    </div>
  );
};

export default MainLayout;

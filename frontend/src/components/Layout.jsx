import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <h1>Maruthupandiyar College</h1>
          </Link>
          
          <div className="user-section">
            {user ? (
              <>
                <span className="user-info">Welcome, {user.username} ({user.role})</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </>
            ) : (
              <button onClick={handleLogin} className="login-btn-header">Login</button>
            )}
          </div>

          <button className="mobile-nav-toggle" onClick={toggleMobileNav}>
            ☰
          </button>
        </div>
      </header>
      
      {user && (
        <nav className={`navigation ${isMobileNavOpen ? 'mobile-nav-active' : ''}`}>
          <ul className="nav-list">
            {user.role === 'admin' && (
              <>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/staff">Staff</Link></li>
                <li><Link to="/admin/courses">Courses</Link></li>
              </>
            )}
            
            {user.role === 'staff' && (
              <>
                <li><Link to="/staff/dashboard">Dashboard</Link></li>
                <li><Link to="/staff/students">Students</Link></li>
                <li><Link to="/staff/attendance">Attendance</Link></li>
                <li><Link to="/staff/marks">Marks</Link></li>
              </>
            )}
            
            {user.role === 'student' && (
              <>
                <li><Link to="/student/dashboard">Dashboard</Link></li>
                <li><Link to="/student/attendance">Attendance</Link></li>
                <li><Link to="/student/marks">Marks</Link></li>
                <li><Link to="/student/notices">Notices</Link></li>
              </>
            )}
          </ul>
        </nav>
      )}
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Maruthupandiyar College. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;

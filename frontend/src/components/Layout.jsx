import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <h1>College Management System</h1>
          </Link>
          
          {user && (
            <div className="user-section">
              <span className="user-info">Welcome, {user.username} ({user.role})</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
        
        {user && (
          <nav className="navigation">
            <ul className="nav-list">
              {user.role === 'admin' && (
                <>
                  <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                  <li><Link to="/admin/staff">Manage Staff</Link></li>
                  <li><Link to="/admin/students">Manage Students</Link></li>
                  <li><Link to="/admin/courses">Manage Courses</Link></li>
                </>
              )}
              
              {user.role === 'staff' && (
                <>
                  <li><Link to="/staff/dashboard">Staff Dashboard</Link></li>
                  <li><Link to="/staff/students">Manage Students</Link></li>
                  <li><Link to="/staff/attendance">Mark Attendance</Link></li>
                  <li><Link to="/staff/marks">Enter Marks</Link></li>
                </>
              )}
              
              {user.role === 'student' && (
                <>
                  <li><Link to="/student/dashboard">Student Dashboard</Link></li>
                  <li><Link to="/student/attendance">My Attendance</Link></li>
                  <li><Link to="/student/marks">My Marks</Link></li>
                  <li><Link to="/student/notices">Notices</Link></li>
                </>
              )}
            </ul>
          </nav>
        )}
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <p>&copy; 2026 College Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
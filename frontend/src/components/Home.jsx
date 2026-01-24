import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you would fetch user details from the API
      // For now, we'll use the user details stored during login
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const getDashboardRoute = () => {
    if (user?.role === 'admin') return '/admin/dashboard';
    if (user?.role === 'staff') return '/staff/dashboard';
    if (user?.role === 'student') return '/student/dashboard';
    return '/login';
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to College Management System</h1>
        <p>A comprehensive solution for managing academic and administrative processes</p>
        
        {user ? (
          <div className="user-dashboard-section">
            <h2>Hello, {user.username}!</h2>
            <p>You are logged in as <strong>{user.role}</strong>.</p>
            <button 
              className="dashboard-btn"
              onClick={() => navigate(getDashboardRoute())}
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="guest-section">
            <p>Please login to access the system</p>
            <button 
              className="login-btn"
              onClick={handleLoginRedirect}
            >
              Login to System
            </button>
          </div>
        )}
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>Student Management</h3>
          <p>Manage student information, enrollment, and academic records</p>
        </div>
        <div className="feature-card">
          <h3>Attendance Tracking</h3>
          <p>Track and monitor student attendance efficiently</p>
        </div>
        <div className="feature-card">
          <h3>Marks Evaluation</h3>
          <p>Enter and track student performance and grades</p>
        </div>
        <div className="feature-card">
          <h3>Course Management</h3>
          <p>Manage courses, subjects, and curriculum</p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <h3>1000+</h3>
          <p>Students Managed</p>
        </div>
        <div className="stat-item">
          <h3>50+</h3>
          <p>Courses Offered</p>
        </div>
        <div className="stat-item">
          <h3>24/7</h3>
          <p>System Availability</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
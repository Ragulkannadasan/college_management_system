import { useState, useEffect } from 'react';
import { staffAPI } from '../../services/api';
import './Dashboard.css';

const StaffDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    classesAssigned: 0,
    pendingAttendance: 0,
    pendingMarks: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch actual data from the API
      // For now, using mock data
      setStats({
        totalStudents: 120,
        classesAssigned: 4,
        pendingAttendance: 2,
        pendingMarks: 5
      });
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="staff-dashboard">
      <h2>Staff Dashboard</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalStudents}</h3>
          <p>Total Students</p>
        </div>
        <div className="stat-card">
          <h3>{stats.classesAssigned}</h3>
          <p>Classes Assigned</p>
        </div>
        <div className="stat-card warning">
          <h3>{stats.pendingAttendance}</h3>
          <p>Pending Attendance</p>
        </div>
        <div className="stat-card warning">
          <h3>{stats.pendingMarks}</h3>
          <p>Pending Marks Entry</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => window.location.href='/staff/students'}>
              <span className="action-icon">👥</span>
              <span>Manage Students</span>
            </button>
            <button className="action-btn" onClick={() => window.location.href='/staff/attendance'}>
              <span className="action-icon">📋</span>
              <span>Mark Attendance</span>
            </button>
            <button className="action-btn" onClick={() => window.location.href='/staff/marks'}>
              <span className="action-icon">📊</span>
              <span>Enter Marks</span>
            </button>
            <button className="action-btn" onClick={() => window.location.href='/staff/assignments'}>
              <span className="action-icon">📝</span>
              <span>Assignments</span>
            </button>
          </div>
        </div>

        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <ul className="activities-list">
            <li className="activity-item">
              <div className="activity-details">
                <p className="activity-action">Marked attendance for CS101</p>
                <p className="activity-time">2 hours ago</p>
              </div>
            </li>
            <li className="activity-item">
              <div className="activity-details">
                <p className="activity-action">Entered marks for Mid-term Exam</p>
                <p className="activity-time">1 day ago</p>
              </div>
            </li>
            <li className="activity-item">
              <div className="activity-details">
                <p className="activity-action">Created new assignment</p>
                <p className="activity-time">2 days ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
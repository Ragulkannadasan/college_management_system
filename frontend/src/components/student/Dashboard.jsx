import { useState, useEffect } from 'react';
import { studentAPI } from '../../services/api';
import './Dashboard.css';

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    attendancePercentage: 0,
    totalSubjects: 0,
    pendingAssignments: 0,
    upcomingExams: 0
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
        attendancePercentage: 85,
        totalSubjects: 6,
        pendingAssignments: 3,
        upcomingExams: 2
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
    <div className="student-dashboard">
      <h2>Student Dashboard</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="stats-grid">
        <div className={`stat-card ${stats.attendancePercentage >= 75 ? 'good' : 'warning'}`}>
          <h3>{stats.attendancePercentage}%</h3>
          <p>Attendance</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalSubjects}</h3>
          <p>Total Subjects</p>
        </div>
        <div className="stat-card warning">
          <h3>{stats.pendingAssignments}</h3>
          <p>Pending Assignments</p>
        </div>
        <div className="stat-card">
          <h3>{stats.upcomingExams}</h3>
          <p>Upcoming Exams</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => window.location.href='/student/attendance'}>
              <span className="action-icon">📋</span>
              <span>View Attendance</span>
            </button>
            <button className="action-btn" onClick={() => window.location.href='/student/marks'}>
              <span className="action-icon">📊</span>
              <span>View Marks</span>
            </button>
            <button className="action-btn" onClick={() => window.location.href='/student/assignments'}>
              <span className="action-icon">📝</span>
              <span>Assignments</span>
            </button>
            <button className="action-btn" onClick={() => window.location.href='/student/notices'}>
              <span className="action-icon">📢</span>
              <span>Notices</span>
            </button>
          </div>
        </div>

        <div className="recent-activities">
          <h3>Recent Updates</h3>
          <ul className="activities-list">
            <li className="activity-item">
              <div className="activity-details">
                <p className="activity-action">Mathematics assignment due tomorrow</p>
                <p className="activity-time">2 hours ago</p>
              </div>
            </li>
            <li className="activity-item">
              <div className="activity-details">
                <p className="activity-action">Physics marks uploaded</p>
                <p className="activity-time">1 day ago</p>
              </div>
            </li>
            <li className="activity-item">
              <div className="activity-details">
                <p className="activity-action">New notice: Exam schedule announced</p>
                <p className="activity-time">2 days ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="academic-summary">
        <h3>Academic Summary</h3>
        <div className="summary-cards">
          <div className="summary-card">
            <h4>Semester Progress</h4>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '65%'}}></div>
            </div>
            <p>65% completed</p>
          </div>
          <div className="summary-card">
            <h4>CGPA</h4>
            <div className="cgpa-display">3.2</div>
            <p>Current CGPA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
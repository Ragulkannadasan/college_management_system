import { useState, useEffect } from 'react';
import './Dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalStaff: 0,
    totalCourses: 0,
    recentActivities: []
  });

  useEffect(() => {
    // In a real app, fetch stats from the API
    // For now, using mock data
    setStats({
      totalStudents: 1245,
      totalStaff: 48,
      totalCourses: 25,
      recentActivities: [
        { id: 1, action: 'Added new student', user: 'John Doe', time: '2 minutes ago' },
        { id: 2, action: 'Updated course curriculum', user: 'Jane Smith', time: '15 minutes ago' },
        { id: 3, action: 'Marked attendance', user: 'Robert Johnson', time: '1 hour ago' },
        { id: 4, action: 'Uploaded marks', user: 'Emily Davis', time: '2 hours ago' }
      ]
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalStudents}</h3>
          <p>Total Students</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalStaff}</h3>
          <p>Total Staff</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalCourses}</h3>
          <p>Total Courses</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <ul className="activities-list">
            {stats.recentActivities.map(activity => (
              <li key={activity.id} className="activity-item">
                <div className="activity-details">
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-user">by {activity.user}</p>
                </div>
                <span className="activity-time">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-btn">
              <span className="action-icon">👥</span>
              <span>Manage Staff</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">🎓</span>
              <span>Manage Students</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📚</span>
              <span>Manage Courses</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📢</span>
              <span>Post Notice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
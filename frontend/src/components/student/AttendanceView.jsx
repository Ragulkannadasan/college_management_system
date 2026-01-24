import { useState, useEffect } from 'react';
import { studentAPI } from '../../services/api';
import Table from '../Table';
import LoadingSpinner from '../LoadingSpinner';
import './AttendanceView.css';

const AttendanceView = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [overallAttendance, setOverallAttendance] = useState(0);

  const subjects = [
    { id: 1, name: 'Mathematics', code: 'MATH101' },
    { id: 2, name: 'Physics', code: 'PHY101' },
    { id: 3, name: 'Chemistry', code: 'CHEM101' },
    { id: 4, name: 'Computer Science', code: 'CS101' }
  ];

  const columns = [
    { key: 'date', header: 'Date', width: '20%' },
    { key: 'subject', header: 'Subject', width: '25%' },
    {
      key: 'status',
      header: 'Status',
      width: '15%',
      render: (status) => (
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      )
    },
    { key: 'session', header: 'Session', width: '20%' },
    { key: 'marked_by', header: 'Faculty', width: '20%' }
  ];

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockData = [
        {
          id: 1,
          date: '2024-01-15',
          subject: 'Computer Science',
          status: 'Present',
          session: 'Lecture',
          marked_by: 'Dr. Smith'
        },
        {
          id: 2,
          date: '2024-01-14',
          subject: 'Physics',
          status: 'Absent',
          session: 'Lab',
          marked_by: 'Prof. Johnson'
        },
        {
          id: 3,
          date: '2024-01-13',
          subject: 'Mathematics',
          status: 'Present',
          session: 'Tutorial',
          marked_by: 'Dr. Brown'
        },
        {
          id: 4,
          date: '2024-01-12',
          subject: 'Chemistry',
          status: 'Present',
          session: 'Lecture',
          marked_by: 'Prof. Davis'
        },
        {
          id: 5,
          date: '2024-01-11',
          subject: 'Computer Science',
          status: 'Present',
          session: 'Lab',
          marked_by: 'Dr. Smith'
        }
      ];
      setAttendanceData(mockData);
      
      // Calculate overall attendance percentage
      const total = mockData.length;
      const present = mockData.filter(record => record.status === 'Present').length;
      setOverallAttendance(total > 0 ? Math.round((present / total) * 100) : 0);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const filteredData = selectedSubject 
    ? attendanceData.filter(record => record.subject === selectedSubject)
    : attendanceData;

  const attendanceSummary = [
    { label: 'Total Classes', value: filteredData.length },
    { label: 'Classes Attended', value: filteredData.filter(r => r.status === 'Present').length },
    { label: 'Classes Missed', value: filteredData.filter(r => r.status === 'Absent').length },
    { 
      label: 'Attendance %', 
      value: filteredData.length > 0 
        ? Math.round((filteredData.filter(r => r.status === 'Present').length / filteredData.length) * 100) 
        : 0 
    }
  ];

  return (
    <div className="attendance-view">
      <div className="page-header">
        <h2>My Attendance</h2>
      </div>

      <div className="overview-section">
        <div className="overall-attendance">
          <div className={`attendance-percentage ${overallAttendance >= 75 ? 'good' : 'poor'}`}>
            <h2>{overallAttendance}%</h2>
            <p>Overall Attendance</p>
          </div>
        </div>
        
        <div className="attendance-summary">
          {attendanceSummary.map((item, index) => (
            <div key={index} className="summary-item">
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Filter by Subject:</label>
          <select 
            value={selectedSubject} 
            onChange={handleSubjectChange}
            className="input-field"
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.name}>
                {subject.name} ({subject.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading attendance records..." />
      ) : (
        <div className="attendance-table">
          <Table
            columns={columns}
            data={filteredData}
            striped
            hover
          />
        </div>
      )}

      {!loading && filteredData.length === 0 && (
        <div className="no-data">
          <p>No attendance records found for the selected criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceView;
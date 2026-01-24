import { useState, useEffect } from 'react';
import { staffAPI } from '../../services/api';
import Table from '../Table';
import Button from '../Button';
import Input from '../Input';
import LoadingSpinner from '../LoadingSpinner';
import './AttendanceManagement.css';

const AttendanceManagement = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);
  const [students, setStudents] = useState([]);

  const subjects = [
    { id: 1, name: 'Mathematics', code: 'MATH101' },
    { id: 2, name: 'Physics', code: 'PHY101' },
    { id: 3, name: 'Chemistry', code: 'CHEM101' },
    { id: 4, name: 'Computer Science', code: 'CS101' }
  ];

  const columns = [
    { key: 'student_name', header: 'Student Name', width: '25%' },
    { key: 'registration_number', header: 'Reg No.', width: '15%' },
    { key: 'subject', header: 'Subject', width: '20%' },
    { key: 'date', header: 'Date', width: '15%' },
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
    {
      key: 'actions',
      header: 'Actions',
      width: '10%',
      render: (_, record) => (
        <Button size="small" variant="outline">Edit</Button>
      )
    }
  ];

  useEffect(() => {
    fetchAttendanceRecords();
  }, [date, selectedSubject]);

  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockRecords = [
        {
          id: 1,
          student_name: 'John Doe',
          registration_number: 'STU001',
          subject: 'Computer Science',
          date: '2024-01-15',
          status: 'Present'
        },
        {
          id: 2,
          student_name: 'Jane Smith',
          registration_number: 'STU002',
          subject: 'Physics',
          date: '2024-01-15',
          status: 'Absent'
        },
        {
          id: 3,
          student_name: 'Mike Johnson',
          registration_number: 'STU003',
          subject: 'Mathematics',
          date: '2024-01-15',
          status: 'Present'
        }
      ];
      setAttendanceRecords(mockRecords);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleMarkAttendance = () => {
    // Mock student data
    const mockStudents = [
      { id: 1, name: 'John Doe', regNo: 'STU001' },
      { id: 2, name: 'Jane Smith', regNo: 'STU002' },
      { id: 3, name: 'Mike Johnson', regNo: 'STU003' }
    ];
    setStudents(mockStudents);
    setShowMarkAttendance(true);
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock API call
      console.log('Submitting attendance for:', students);
      // In real implementation: await staffAPI.markAttendance(attendanceData);
      
      setShowMarkAttendance(false);
      fetchAttendanceRecords();
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesDate = !date || record.date === date;
    const matchesSubject = !selectedSubject || record.subject === selectedSubject;
    return matchesDate && matchesSubject;
  });

  return (
    <div className="attendance-management">
      <div className="page-header">
        <h2>Attendance Management</h2>
        <Button onClick={handleMarkAttendance}>Mark Attendance</Button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Date:</label>
          <Input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="date-filter"
          />
        </div>
        <div className="filter-group">
          <label>Subject:</label>
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

      {showMarkAttendance && (
        <div className="attendance-form-overlay">
          <div className="attendance-form-modal">
            <h3>Mark Attendance</h3>
            <form onSubmit={handleAttendanceSubmit}>
              <div className="form-group">
                <label>Subject:</label>
                <select className="input-field" required>
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} ({subject.code})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Date:</label>
                <Input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="student-attendance-list">
                <h4>Students</h4>
                {students.map(student => (
                  <div key={student.id} className="student-row">
                    <span className="student-info">
                      {student.name} ({student.regNo})
                    </span>
                    <div className="attendance-options">
                      <label>
                        <input type="radio" name={`attendance-${student.id}`} value="present" defaultChecked />
                        Present
                      </label>
                      <label>
                        <input type="radio" name={`attendance-${student.id}`} value="absent" />
                        Absent
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <Button type="submit" variant="primary">Submit Attendance</Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => setShowMarkAttendance(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Loading attendance records..." />
      ) : (
        <>
          <div className="attendance-stats">
            <div className="stat-card">
              <h3>{filteredRecords.length}</h3>
              <p>Total Records</p>
            </div>
            <div className="stat-card present">
              <h3>{filteredRecords.filter(r => r.status === 'Present').length}</h3>
              <p>Present</p>
            </div>
            <div className="stat-card absent">
              <h3>{filteredRecords.filter(r => r.status === 'Absent').length}</h3>
              <p>Absent</p>
            </div>
          </div>
          
          <Table
            columns={columns}
            data={filteredRecords}
            striped
            hover
          />
        </>
      )}
    </div>
  );
};

export default AttendanceManagement;
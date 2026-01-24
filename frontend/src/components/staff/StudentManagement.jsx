import { useState, useEffect } from 'react';
import { staffAPI } from '../../services/api';
import Table from '../Table';
import Button from '../Button';
import Input from '../Input';
import LoadingSpinner from '../LoadingSpinner';
import './StudentManagement.css';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    registrationNumber: '',
    course: '',
    semester: ''
  });
  const [errors, setErrors] = useState({});

  const columns = [
    { key: 'registration_number', header: 'Reg No.', width: '15%' },
    { key: 'first_name', header: 'First Name', width: '15%' },
    { key: 'last_name', header: 'Last Name', width: '15%' },
    { key: 'email', header: 'Email', width: '20%' },
    { key: 'course_name', header: 'Course', width: '15%' },
    { key: 'semester', header: 'Semester', width: '10%' },
    {
      key: 'actions',
      header: 'Actions',
      width: '10%',
      render: (_, student) => (
        <div className="action-buttons">
          <Button size="small" variant="outline">Edit</Button>
          <Button size="small" variant="danger">Delete</Button>
        </div>
      )
    }
  ];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockStudents = [
        {
          id: 1,
          registration_number: 'STU001',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@student.edu',
          course_name: 'Computer Science',
          semester: 4
        },
        {
          id: 2,
          registration_number: 'STU002',
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@student.edu',
          course_name: 'Electronics',
          semester: 3
        },
        {
          id: 3,
          registration_number: 'STU003',
          first_name: 'Mike',
          last_name: 'Johnson',
          email: 'mike.johnson@student.edu',
          course_name: 'Mechanical',
          semester: 5
        }
      ];
      setStudents(mockStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(student =>
    student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.registration_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = 'Registration number is required';
    }
    
    if (!formData.course) {
      newErrors.course = 'Course is required';
    }
    
    if (!formData.semester) {
      newErrors.semester = 'Semester is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Mock API call
      console.log('Adding student:', formData);
      // In real implementation: await staffAPI.createStudent(formData);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        registrationNumber: '',
        course: '',
        semester: ''
      });
      setShowAddForm(false);
      
      // Refresh student list
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      registrationNumber: '',
      course: '',
      semester: ''
    });
    setErrors({});
    setShowAddForm(false);
  };

  return (
    <div className="student-management">
      <div className="page-header">
        <h2>Student Management</h2>
        <Button onClick={() => setShowAddForm(true)}>Add Student</Button>
      </div>

      <div className="search-container">
        <Input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {showAddForm && (
        <div className="add-form-overlay">
          <div className="add-form-modal">
            <h3>Add New Student</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  required
                />
              </div>
              
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
              />
              
              <Input
                label="Registration Number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                error={errors.registrationNumber}
                required
              />
              
              <div className="form-row">
                <Input
                  label="Course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  error={errors.course}
                  required
                />
                <Input
                  label="Semester"
                  name="semester"
                  type="number"
                  min="1"
                  max="8"
                  value={formData.semester}
                  onChange={handleInputChange}
                  error={errors.semester}
                  required
                />
              </div>
              
              <div className="form-actions">
                <Button type="submit" variant="primary">Add Student</Button>
                <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Loading students..." />
      ) : (
        <Table
          columns={columns}
          data={filteredStudents}
          striped
          hover
        />
      )}
    </div>
  );
};

export default StudentManagement;
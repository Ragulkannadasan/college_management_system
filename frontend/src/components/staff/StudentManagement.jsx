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
  const [successMessage, setSuccessMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    registrationNumber: '',
    course: '',
    semester: '',
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const columns = [
    { key: 'registration_number', header: 'Reg No.' },
    { key: 'first_name', header: 'First Name' },
    { key: 'last_name', header: 'Last Name' },
    { key: 'email', header: 'Email' },
    { key: 'course_name', header: 'Course' },
    { key: 'semester', header: 'Semester' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, student) => (
        <div className="action-buttons">
          <Button size="small" variant="outline">Edit</Button>
          <Button size="small" variant="danger">Delete</Button>
        </div>
      )
    }
  ];

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await staffAPI.getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(student =>
    (student.first_name && student.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.last_name && student.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.registration_number && student.registration_number.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newFormData = { ...prev, [name]: value };
      // Pre-fill username with registration number
      if (name === 'registrationNumber') {
        newFormData.username = value;
      }
      return newFormData;
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.semester) newErrors.semester = 'Semester is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!validateForm()) return;

    try {
      const response = await staffAPI.createStudent(formData);
      setStudents(currentStudents => [...currentStudents, response.data]);
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        registrationNumber: '',
        course: '',
        semester: '',
        username: '',
        password: ''
      });
      setShowAddForm(false);
      setSuccessMessage('Student added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding student:', error);
      setFormError(error.message || 'An unknown error occurred.');
    }
  };

  const handleCancel = () => {
    setFormData({
        firstName: '',
        lastName: '',
        email: '',
        registrationNumber: '',
        course: '',
        semester: '',
        username: '',
        password: ''
    });
    setErrors({});
    setFormError('');
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
      
      {successMessage && <div className="success-message">{successMessage}</div>}

      {showAddForm && (
        <div className="add-form-overlay">
          <div className="add-form-modal">
            <h3>Add New Student</h3>
            {formError && <div className="error-message modal-error">{formError}</div>}
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
              
              <div className="form-row">
                 <Input
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    error={errors.username}
                    required
                    readOnly 
                  />
                  <Input
                    label="Temporary Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
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

import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    registrationNumber: '',
    course: '',
    semester: '',
    admissionYear: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const courses = [
    { id: 1, name: 'B.Tech Computer Science', code: 'BTech-CS' },
    { id: 2, name: 'B.Tech Electronics', code: 'BTech-ECE' },
    { id: 3, name: 'B.Tech Mechanical', code: 'BTech-MECH' },
    { id: 4, name: 'B.Tech Civil', code: 'BTech-CIVIL' },
    { id: 5, name: 'M.Tech Computer Science', code: 'MTech-CS' }
  ];

  const columns = [
    { key: 'registration_number', header: 'Reg No.', width: '12%' },
    { key: 'first_name', header: 'First Name', width: '12%' },
    { key: 'last_name', header: 'Last Name', width: '12%' },
    { key: 'email', header: 'Email', width: '18%' },
    { key: 'course_name', header: 'Course', width: '15%' },
    { key: 'semester', header: 'Semester', width: '8%' },
    { key: 'admission_year', header: 'Admission Year', width: '12%' },
    {
      key: 'actions',
      header: 'Actions',
      width: '11%',
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
          registration_number: 'STU2024001',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@student.college.edu',
          course_name: 'B.Tech Computer Science',
          semester: 4,
          admission_year: '2022',
          phone: '+1234567890'
        },
        {
          id: 2,
          registration_number: 'STU2024002',
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@student.college.edu',
          course_name: 'B.Tech Electronics',
          semester: 3,
          admission_year: '2022',
          phone: '+1234567891'
        },
        {
          id: 3,
          registration_number: 'STU2024003',
          first_name: 'Mike',
          last_name: 'Johnson',
          email: 'mike.johnson@student.college.edu',
          course_name: 'B.Tech Mechanical',
          semester: 5,
          admission_year: '2021',
          phone: '+1234567892'
        },
        {
          id: 4,
          registration_number: 'STU2024004',
          first_name: 'Sarah',
          last_name: 'Williams',
          email: 'sarah.williams@student.college.edu',
          course_name: 'B.Tech Civil',
          semester: 2,
          admission_year: '2023',
          phone: '+1234567893'
        },
        {
          id: 5,
          registration_number: 'STU2024005',
          first_name: 'David',
          last_name: 'Brown',
          email: 'david.brown@student.college.edu',
          course_name: 'M.Tech Computer Science',
          semester: 1,
          admission_year: '2023',
          phone: '+1234567894'
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
    student.registration_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Student form input changed:', name, '=', value);
    
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
    console.log('Validating student form with data:', formData);
    
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
    
    if (!formData.admissionYear) {
      newErrors.admissionYear = 'Admission year is required';
    }
    
    if (formData.phone && !/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    setErrors(newErrors);
    console.log('Student validation errors:', newErrors);
    console.log('Student form is valid:', Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Student form submitted with data:', formData);
    console.log('Current student errors:', errors);
    
    const isValid = validateForm();
    console.log('Student form validation result:', isValid);
    
    if (!isValid) {
      console.log('Student form has errors, not submitting');
      return;
    }
    
    try {
      // Mock API call
      console.log('Adding student:', formData);
      // In real implementation: await adminAPI.createStudent(formData);
      
      // Add the new student to the list
      const newStudent = {
        id: students.length + 1,
        registration_number: formData.registrationNumber,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        course_name: formData.course,
        semester: parseInt(formData.semester),
        admission_year: formData.admissionYear,
        phone: formData.phone
      };
      
      setStudents(prev => [...prev, newStudent]);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        registrationNumber: '',
        course: '',
        semester: '',
        admissionYear: '',
        phone: ''
      });
      setErrors({});
      setShowAddForm(false);
      
      // Show success message
      setSuccessMessage('Student added successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
      console.log('Student added successfully');
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
      semester: '',
      admissionYear: '',
      phone: ''
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

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

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
              
              <div className="form-row">
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                />
                <Input
                  label="Registration Number"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  error={errors.registrationNumber}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="input-group">
                  <label className="input-label">
                    Course <span className="required">*</span>
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className={`input-field ${errors.course ? 'input-error' : ''}`}
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.name}>
                        {course.name} ({course.code})
                      </option>
                    ))}
                  </select>
                  {errors.course && <span className="error-message">{errors.course}</span>}
                </div>
                
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
              
              <Input
                label="Admission Year"
                name="admissionYear"
                type="number"
                min="2010"
                max={new Date().getFullYear()}
                value={formData.admissionYear}
                onChange={handleInputChange}
                error={errors.admissionYear}
                required
              />
              
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
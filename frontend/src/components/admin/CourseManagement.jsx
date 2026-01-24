import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import Table from '../Table';
import Button from '../Button';
import Input from '../Input';
import LoadingSpinner from '../LoadingSpinner';
import './CourseManagement.css';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    department: '',
    duration: '',
    credits: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const departments = [
    { id: 1, name: 'Computer Science & Engineering' },
    { id: 2, name: 'Electronics & Communication Engineering' },
    { id: 3, name: 'Mechanical Engineering' },
    { id: 4, name: 'Civil Engineering' },
    { id: 5, name: 'Electrical Engineering' },
    { id: 6, name: 'Mathematics' },
    { id: 7, name: 'Physics' },
    { id: 8, name: 'Chemistry' }
  ];

  const durations = [
    { value: '2', label: '2 Years (Diploma)' },
    { value: '3', label: '3 Years (Diploma)' },
    { value: '4', label: '4 Years (Bachelor\'s)' },
    { value: '2_MTech', label: '2 Years (Master\'s)' },
    { value: '3_MTech', label: '3 Years (Master\'s)' }
  ];

  const columns = [
    { key: 'code', header: 'Course Code', width: '12%' },
    { key: 'name', header: 'Course Name', width: '25%' },
    { key: 'department', header: 'Department', width: '20%' },
    { key: 'duration', header: 'Duration', width: '12%' },
    { key: 'credits', header: 'Credits', width: '8%' },
    {
      key: 'students_enrolled',
      header: 'Enrolled',
      width: '8%',
      render: (count) => <span className="enrollment-count">{count || 0}</span>
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '15%',
      render: (_, course) => (
        <div className="action-buttons">
          <Button size="small" variant="outline">Edit</Button>
          <Button size="small" variant="danger">Delete</Button>
        </div>
      )
    }
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockCourses = [
        {
          id: 1,
          code: 'BTech-CS',
          name: 'Bachelor of Technology in Computer Science',
          department: 'Computer Science & Engineering',
          duration: '4 Years',
          credits: 160,
          description: 'Comprehensive program covering software engineering, algorithms, and computer systems.',
          students_enrolled: 120
        },
        {
          id: 2,
          code: 'BTech-ECE',
          name: 'Bachelor of Technology in Electronics & Communication',
          department: 'Electronics & Communication Engineering',
          duration: '4 Years',
          credits: 155,
          description: 'Focus on electronic circuits, communication systems, and signal processing.',
          students_enrolled: 95
        },
        {
          id: 3,
          code: 'BTech-MECH',
          name: 'Bachelor of Technology in Mechanical Engineering',
          department: 'Mechanical Engineering',
          duration: '4 Years',
          credits: 165,
          description: 'Covers thermodynamics, mechanics, manufacturing, and design principles.',
          students_enrolled: 110
        },
        {
          id: 4,
          code: 'BTech-CIVIL',
          name: 'Bachelor of Technology in Civil Engineering',
          department: 'Civil Engineering',
          duration: '4 Years',
          credits: 160,
          description: 'Focus on structural engineering, construction management, and infrastructure.',
          students_enrolled: 85
        },
        {
          id: 5,
          code: 'MTech-CS',
          name: 'Master of Technology in Computer Science',
          department: 'Computer Science & Engineering',
          duration: '2 Years',
          credits: 64,
          description: 'Advanced studies in specialized areas of computer science and research.',
          students_enrolled: 25
        },
        {
          id: 6,
          code: 'DIPLOMA-ECE',
          name: 'Diploma in Electronics & Communication',
          department: 'Electronics & Communication Engineering',
          duration: '3 Years',
          credits: 90,
          description: 'Practical diploma program focusing on electronic devices and communication.',
          students_enrolled: 60
        }
      ];
      setCourses(mockCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.department.toLowerCase().includes(searchTerm.toLowerCase())
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
    }
    
    if (!formData.code.trim()) {
      newErrors.code = 'Course code is required';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    }
    
    if (!formData.credits) {
      newErrors.credits = 'Credits are required';
    } else if (isNaN(formData.credits) || parseInt(formData.credits) <= 0) {
      newErrors.credits = 'Credits must be a positive number';
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
      console.log('Adding course:', formData);
      // In real implementation: await adminAPI.createCourse(formData);
      
      // Reset form
      setFormData({
        name: '',
        code: '',
        department: '',
        duration: '',
        credits: '',
        description: ''
      });
      setShowAddForm(false);
      
      // Refresh course list
      fetchCourses();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      code: '',
      department: '',
      duration: '',
      credits: '',
      description: ''
    });
    setErrors({});
    setShowAddForm(false);
  };

  return (
    <div className="course-management">
      <div className="page-header">
        <h2>Course Management</h2>
        <Button onClick={() => setShowAddForm(true)}>Add New Course</Button>
      </div>

      <div className="search-container">
        <Input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {showAddForm && (
        <div className="add-form-overlay">
          <div className="add-form-modal">
            <h3>Add New Course</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <Input
                  label="Course Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  required
                />
                <Input
                  label="Course Code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  error={errors.code}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="input-group">
                  <label className="input-label">
                    Department <span className="required">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`input-field ${errors.department ? 'input-error' : ''}`}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  {errors.department && <span className="error-message">{errors.department}</span>}
                </div>
                
                <div className="input-group">
                  <label className="input-label">
                    Duration <span className="required">*</span>
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`input-field ${errors.duration ? 'input-error' : ''}`}
                  >
                    <option value="">Select Duration</option>
                    {durations.map(dur => (
                      <option key={dur.value} value={dur.label}>
                        {dur.label}
                      </option>
                    ))}
                  </select>
                  {errors.duration && <span className="error-message">{errors.duration}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <Input
                  label="Credits"
                  name="credits"
                  type="number"
                  min="1"
                  value={formData.credits}
                  onChange={handleInputChange}
                  error={errors.credits}
                  required
                />
              </div>
              
              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="input-field"
                  rows="4"
                  placeholder="Enter course description..."
                />
              </div>
              
              <div className="form-actions">
                <Button type="submit" variant="primary">Add Course</Button>
                <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Loading courses..." />
      ) : (
        <>
          <div className="courses-stats">
            <div className="stat-card">
              <h3>{filteredCourses.length}</h3>
              <p>Total Courses</p>
            </div>
            <div className="stat-card">
              <h3>{filteredCourses.reduce((sum, course) => sum + (course.students_enrolled || 0), 0)}</h3>
              <p>Total Students</p>
            </div>
            <div className="stat-card">
              <h3>{departments.length}</h3>
              <p>Departments</p>
            </div>
          </div>
          
          <Table
            columns={columns}
            data={filteredCourses}
            striped
            hover
          />
        </>
      )}
    </div>
  );
};

export default CourseManagement;
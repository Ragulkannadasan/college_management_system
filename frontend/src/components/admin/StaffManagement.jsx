import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import Table from '../Table';
import Button from '../Button';
import Input from '../Input';
import LoadingSpinner from '../LoadingSpinner';
import './StaffManagement.css';

const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    employeeId: '',
    department: '',
    designation: '',
    joiningDate: ''
  });
  const [errors, setErrors] = useState({});

  const departments = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Electronics & Communication' },
    { id: 3, name: 'Mechanical Engineering' },
    { id: 4, name: 'Civil Engineering' },
    { id: 5, name: 'Mathematics' },
    { id: 6, name: 'Physics' }
  ];

  const columns = [
    { key: 'employee_id', header: 'Employee ID', width: '12%' },
    { key: 'first_name', header: 'First Name', width: '12%' },
    { key: 'last_name', header: 'Last Name', width: '12%' },
    { key: 'email', header: 'Email', width: '20%' },
    { key: 'department', header: 'Department', width: '15%' },
    { key: 'designation', header: 'Designation', width: '15%' },
    {
      key: 'actions',
      header: 'Actions',
      width: '14%',
      render: (_, staff) => (
        <div className="action-buttons">
          <Button size="small" variant="outline">Edit</Button>
          <Button size="small" variant="danger">Delete</Button>
        </div>
      )
    }
  ];

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const fetchStaffMembers = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockStaff = [
        {
          id: 1,
          employee_id: 'EMP001',
          first_name: 'Dr. Robert',
          last_name: 'Smith',
          email: 'robert.smith@college.edu',
          department: 'Computer Science',
          designation: 'Professor',
          joining_date: '2020-01-15'
        },
        {
          id: 2,
          employee_id: 'EMP002',
          first_name: 'Prof. Sarah',
          last_name: 'Johnson',
          email: 'sarah.johnson@college.edu',
          department: 'Electronics & Communication',
          designation: 'Associate Professor',
          joining_date: '2019-08-20'
        },
        {
          id: 3,
          employee_id: 'EMP003',
          first_name: 'Dr. Michael',
          last_name: 'Brown',
          email: 'michael.brown@college.edu',
          department: 'Mechanical Engineering',
          designation: 'Assistant Professor',
          joining_date: '2021-03-10'
        },
        {
          id: 4,
          employee_id: 'EMP004',
          first_name: 'Dr. Emily',
          last_name: 'Davis',
          email: 'emily.davis@college.edu',
          department: 'Mathematics',
          designation: 'Professor',
          joining_date: '2018-07-05'
        }
      ];
      setStaffMembers(mockStaff);
    } catch (error) {
      console.error('Error fetching staff members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStaff = staffMembers.filter(staff =>
    staff.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, '=', value);
    
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
    console.log('Validating form with data:', formData);
    
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
    
    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }
    
    if (!formData.joiningDate) {
      newErrors.joiningDate = 'Joining date is required';
    }
    
    setErrors(newErrors);
    console.log('Validation errors:', newErrors);
    console.log('Is valid:', Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    console.log('Current errors:', errors);
    
    const isValid = validateForm();
    console.log('Form validation result:', isValid);
    console.log('Errors after validation:', errors);
    
    if (!isValid) {
      console.log('Form has errors, not submitting');
      return;
    }
    
    try {
      // Mock API call
      console.log('Adding staff member:', formData);
      // In real implementation: await adminAPI.createStaff(formData);
      
      // Add the new staff member to the list
      const newStaffMember = {
        id: staffMembers.length + 1,
        employee_id: formData.employeeId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        department: formData.department,
        designation: formData.designation,
        joining_date: formData.joiningDate
      };
      
      setStaffMembers(prev => [...prev, newStaffMember]);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        employeeId: '',
        department: '',
        designation: '',
        joiningDate: ''
      });
      setErrors({});
      setShowAddForm(false);
      
      // Show success message
      setSuccessMessage('Staff member added successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
      console.log('Staff member added successfully');
    } catch (error) {
      console.error('Error adding staff member:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      employeeId: '',
      department: '',
      designation: '',
      joiningDate: ''
    });
    setErrors({});
    setShowAddForm(false);
  };

  return (
    <div className="staff-management">
      <div className="page-header">
        <h2>Staff Management</h2>
        <Button onClick={() => setShowAddForm(true)}>Add Staff Member</Button>
      </div>

      <div className="search-container">
        <Input
          type="text"
          placeholder="Search staff members..."
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
            <h3>Add New Staff Member</h3>
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
                  label="Employee ID"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  error={errors.employeeId}
                  required
                />
                <Input
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  error={errors.designation}
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
                
                <Input
                  label="Joining Date"
                  name="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  error={errors.joiningDate}
                  required
                />
              </div>
              
              <div className="form-actions">
                <Button type="submit" variant="primary">Add Staff Member</Button>
                <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Loading staff members..." />
      ) : (
        <Table
          columns={columns}
          data={filteredStaff}
          striped
          hover
        />
      )}
    </div>
  );
};

export default StaffManagement;
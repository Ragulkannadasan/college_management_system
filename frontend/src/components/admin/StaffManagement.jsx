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
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const columns = [
    { key: 'username', header: 'Username' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, staff) => (
        <div className="action-buttons">
          <Button size="small" variant="outline">Edit</Button>
          <Button size="small" variant="danger">Delete</Button>
        </div>
      )
    }
  ];

  const fetchStaffMembers = async () => {
    try {
      setLoading(true);
      // Correctly access the 'data' property from the API response
      const response = await adminAPI.getStaff();
      setStaffMembers(response.data); 
    } catch (error) {
      console.error('Error fetching staff members:', error);
      // Optionally set an error state to show in the UI
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch data when the component mounts
  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStaff = staffMembers.filter(staff =>
    staff.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!validateForm()) return;

    try {
      const response = await adminAPI.createStaff(formData);
      
      // Correctly and efficiently update the state with the new staff member
      setStaffMembers(currentStaff => [...currentStaff, response.data]);
      
      setFormData({ username: '', email: '', password: '' });
      setShowAddForm(false);
      setSuccessMessage('Staff member added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding staff member:', error);
      setFormError(error.message || 'An unknown error occurred.');
    }
  };

  const handleCancel = () => {
    setFormData({ username: '', email: '', password: '' });
    setErrors({});
    setFormError('');
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
        <div className="success-message">{successMessage}</div>
      )}

      {showAddForm && (
        <div className="add-form-overlay">
          <div className="add-form-modal">
            <h3>Add New Staff Member</h3>
            {formError && <div className="error-message modal-error">{formError}</div>}
            <form onSubmit={handleSubmit}>
              <Input
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                error={errors.username}
                required
              />
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
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                required
              />
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

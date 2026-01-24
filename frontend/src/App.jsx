import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ChangePassword from './components/ChangePassword';
import AdminDashboard from './components/admin/Dashboard';
import AdminStaffManagement from './components/admin/StaffManagement';
import AdminCourseManagement from './components/admin/CourseManagement';
import StaffDashboard from './components/staff/Dashboard';
import StaffStudentManagement from './components/staff/StudentManagement';
import StaffAttendanceManagement from './components/staff/AttendanceManagement';
import StudentDashboard from './components/student/Dashboard';
import StudentAttendanceView from './components/student/AttendanceView';
import NotFound from './components/NotFound';
import './App.css';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/staff" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminStaffManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/courses" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminCourseManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <StaffDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/students" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <StaffStudentManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/attendance" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <StaffAttendanceManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/attendance" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentAttendanceView />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="*" 
              element={<NotFound />} 
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;

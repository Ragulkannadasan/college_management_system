import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/admin/Dashboard';
import AdminStaffManagement from './components/admin/StaffManagement';
import AdminStudentManagement from './components/admin/StudentManagement';
import AdminCourseManagement from './components/admin/CourseManagement';
import StaffDashboard from './components/staff/Dashboard';
import StaffStudentManagement from './components/staff/StudentManagement';
import StaffAttendanceManagement from './components/staff/AttendanceManagement';
import StudentDashboard from './components/student/Dashboard';
import StudentAttendanceView from './components/student/AttendanceView';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/" 
              element={
                <Layout>
                  <Home />
                </Layout>
              } 
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/staff" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <AdminStaffManagement />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/students" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <AdminStudentManagement />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/courses" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <AdminCourseManagement />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <Layout>
                    <StaffDashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/students" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <Layout>
                    <StaffStudentManagement />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/attendance" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <Layout>
                    <StaffAttendanceManagement />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Layout>
                    <StudentDashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/attendance" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Layout>
                    <StudentAttendanceView />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <div>Other Admin Content</div>
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/*" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <Layout>
                    <div>Staff Content</div>
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/*" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Layout>
                    <div>Student Content</div>
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="*" 
              element={
                <Layout>
                  <NotFound />
                </Layout>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
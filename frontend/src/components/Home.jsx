import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      const { role } = user;
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'staff') navigate('/staff/dashboard');
      else if (role === 'student') navigate('/student/dashboard');
      else navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Maruthupandiyar College</h1>
          <p>A comprehensive, modern solution for managing academic and administrative tasks efficiently.</p>
          <button onClick={handleGetStarted} className="cta-button">
            {user ? 'Go to Dashboard' : 'Get Started'}
          </button>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Student Management</h3>
            <p>Effortlessly manage student information, enrollment, and academic records in one centralized system.</p>
          </div>
          <div className="feature-card">
            <h3>Attendance Tracking</h3>
            <p>Track and monitor student attendance with an intuitive and efficient digital interface.</p>
          </div>
          <div className="feature-card">
            <h3>Marks & Grades</h3>
            <p>Streamline the process of entering, tracking, and evaluating student performance and grades.</p>
          </div>
          <div className="feature-card">
            <h3>Course Management</h3>
            <p>Organize and manage courses, subjects, and curriculum with our flexible management tools.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Why Choose Our System?</h2>
        <ul>
          <li><strong>Centralized Data:</strong> Access all academic and administrative data from a single, secure platform.</li>
          <li><strong>Time-Saving:</strong> Automate repetitive tasks and reduce administrative overhead.</li>
          <li><strong>Improved Communication:</strong> Foster better communication between students, staff, and administration.</li>
          <li><strong>Data-Driven Insights:</strong> Gain valuable insights into student performance and institutional efficiency.</li>
        </ul>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"This system has transformed how we manage our daily operations. It's intuitive, efficient, and has saved us countless hours."</p>
            <footer>- Jane Doe, Administrator</footer>
          </div>
          <div className="testimonial-card">
            <p>"As a teacher, the attendance and marks modules are incredibly helpful. I can focus more on teaching and less on paperwork."</p>
            <footer>- John Smith, Staff</footer>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Log in to your account or contact our support team to learn more about our College Management System.</p>
        <button onClick={handleGetStarted} className="cta-button-secondary">
          {user ? 'Back to Dashboard' : 'Log In'}
        </button>
      </section>
    </div>
  );
};

export default Home;

import './index.css';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm';

function LoginPage() {
  const token = localStorage.getItem('token');
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    user = null;
  }

  const role = (user?.role || '').toLowerCase().trim();
  const isValidRole = ['teacher', 'coordinator', 'student'].includes(role);

  // Without logout, never go to /login if valid session exists
  if (token && user && isValidRole) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="login-page">
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="bg-glow orb-1"></div>
      <div className="bg-glow orb-2"></div>
      <div className="bg-glow orb-3"></div>

      {/* LOGIN CARD */}
      <LoginForm />
    </div>
  );
}

export default LoginPage;
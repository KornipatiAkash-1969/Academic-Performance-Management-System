import {
  Navigate
} from 'react-router-dom';

function ProtectedRoute({

  children,
  allowedRoles

}) {

  const token =
    localStorage.getItem('token');

  let user = null;

  try {

    user =
      JSON.parse(
        localStorage.getItem('user')
      );

  } catch (error) {

    console.log(error);

  }

  // No Login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const role = (user.role || '').toLowerCase().trim();

  // Role Not Allowed
  if (allowedRoles) {
    const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase().trim());
    if (!normalizedAllowed.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;

}

export default ProtectedRoute;
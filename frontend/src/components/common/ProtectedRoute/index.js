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

  // Role Not Allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;

}

export default ProtectedRoute;
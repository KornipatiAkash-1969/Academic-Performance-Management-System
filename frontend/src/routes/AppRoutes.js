import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import CreateTeacher from '../pages/CreateTeacher';
import LoginPage from '../pages/LoginPage';
import TeacherDashboard from '../pages/TeacherDashboard';
import StudentDashboard from '../pages/StudentDashboard';
import CoordinatorDashboard from '../pages/CoordinatorDashboard';
import SubjectManagementPage from '../pages/SubjectManagementPage';
import StudentSubjects from '../pages/StudentSubjects';
import AddStudentPage from '../pages/AddStudentPage';
import AddMarksPage from '../pages/AddMarksPage';
import StudentMarks from '../pages/StudentMarks';
import CoordinatorNotes from '../pages/CoordinatorNotes';
import TeacherStudents from '../pages/TeacherStudents';
import MyAccountPage from '../pages/MyAccountPage';
import ProtectedRoute from '../components/common/ProtectedRoute';

// ROOT DASHBOARD ROUTER: URL http://localhost:3000/
function DashboardRouter() {
  const token = localStorage.getItem('token');
  let user = null;

  try {
    const raw = localStorage.getItem('user');
    user = raw ? JSON.parse(raw) : null;
  } catch (error) {
    user = null;
  }

  // Not logged in -> must go to /login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const role = (user.role || '').toLowerCase().trim();

  // Render role-specific dashboard at /
  if (role === 'teacher') {
    return <TeacherDashboard />;
  } else if (role === 'coordinator') {
    return <CoordinatorDashboard />;
  } else if (role === 'student') {
    return <StudentDashboard />;
  }

  // Corrupted or unrecognized role: clear session to break any redirect loop
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DASHBOARD AT ROOT (http://localhost:3000/) */}
        <Route path="/" element={<DashboardRouter />} />

        {/* LOGIN PAGE (http://localhost:3000/login) */}
        <Route path="/login" element={<LoginPage />} />

        {/* LEGACY DASHBOARD PATHS */}
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coordinator-dashboard"
          element={
            <ProtectedRoute allowedRoles={['coordinator']}>
              <CoordinatorDashboard />
            </ProtectedRoute>
          }
        />

        {/* TEACHER ROUTES */}
        <Route
          path="/teacher-students"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <SubjectManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-student"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <AddStudentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-marks"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <AddMarksPage />
            </ProtectedRoute>
          }
        />

        {/* STUDENT ROUTES */}
        <Route
          path="/student-subjects"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentSubjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-marks"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentMarks />
            </ProtectedRoute>
          }
        />

        {/* COORDINATOR ROUTES */}
        <Route
          path="/coordinator-notes"
          element={
            <ProtectedRoute allowedRoles={['coordinator']}>
              <CoordinatorNotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-teacher"
          element={
            <ProtectedRoute allowedRoles={['coordinator']}>
              <CreateTeacher />
            </ProtectedRoute>
          }
        />

        {/* MY ACCOUNT ROUTE (ALL ROLES) */}
        <Route
          path="/my-account"
          element={
            <ProtectedRoute allowedRoles={['teacher', 'student', 'coordinator']}>
              <MyAccountPage />
            </ProtectedRoute>
          }
        />

        {/* CATCH ALL - REDIRECT TO / */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
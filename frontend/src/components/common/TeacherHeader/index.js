import './index.css';

import {
  Link
} from 'react-router-dom';

function TeacherHeader() {

  // LOGOUT

  const logout = () => {

    localStorage.clear();

    window.location.href = '/login';

  };

  return (

    <div className="teacher-header">

      {/* LOGO */}

      <div className="teacher-logo">

        Teacher Portal

      </div>


      {/* NAVIGATION */}

      <div className="teacher-links">

        <Link to="/teacher-dashboard">

          Dashboard

        </Link>

        <Link to="/subjects">

          Subjects

        </Link>

        <Link to="/add-student">

          Add Student

        </Link>

        <Link to="/teacher-students">

          Students List

        </Link>

        <Link to="/add-marks">

          Add Marks

        </Link>

        <button
          onClick={logout}
        >

          Logout

        </button>

      </div>

    </div>

  );

}

export default TeacherHeader;
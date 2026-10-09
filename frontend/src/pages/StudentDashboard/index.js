import './index.css';

import {
  Link
} from 'react-router-dom';

import DashboardLayout from '../../components/common/DashboardLayout';

import NotesList
from '../../components/common/NotesList';

function StudentDashboard() {

  const userString =
    localStorage.getItem('user');

  let user = {};

  try {

    user = userString
      ? JSON.parse(userString)
      : {};

  } catch (error) {

    console.log(error);

  }

  return (

    <DashboardLayout role="student" title="Student Dashboard">


      {/* CONTENT */}

      <div className="student-content">

        <h1>
          Student Dashboard
        </h1>

        <div className="student-card">

          <h2>
            Welcome
            {' '}
            {user.name}
          </h2>

          <p>

            <strong>
              Student ID:
            </strong>

            {' '}

            {user.student_id}

          </p>

          <p>

            <strong>
              Email:
            </strong>

            {' '}

            {user.email}

          </p>

          <p>

            <strong>
              Role:
            </strong>

            {' '}

            {user.role}

          </p>

        </div>


        {/* BUTTONS */}

        <div className="student-links">

          <Link
            to="/student-subjects"
            className="student-btn"
          >

            View Subjects

          </Link>

          <Link
            to="/student-marks"
            className="student-btn"
          >

            View Marks

          </Link>

        </div>


        {/* NOTES */}

        <NotesList />

      </div>

    </DashboardLayout>
  );
}

export default StudentDashboard;
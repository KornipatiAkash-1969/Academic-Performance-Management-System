import './index.css';

import {
  Link
} from 'react-router-dom';

function Header() {

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

  const logout = () => {

    localStorage.clear();

    window.location.href = '/login';

  };

  return (

    <div className="header">

      {/* LOGO */}

      <div className="header-logo">

        Student Portal

      </div>


      {/* NAVIGATION */}

      <div className="header-links">

        {/* STUDENT */}

        {

          user.role === 'student'
          && (

            <>

              <Link to="/student-dashboard">

                Dashboard

              </Link>

              <Link to="/student-subjects">

                Subjects

              </Link>

              <Link to="/student-marks">

                Marks

              </Link>

            </>

          )

        }


        {/* TEACHER */}

        {

          user.role === 'teacher'
          && (

            <>

              <Link to="/teacher-dashboard">

                Dashboard

              </Link>

              <Link to="/subjects">

                Subjects

              </Link>

              <Link to="/add-student">

                Students

              </Link>

              <Link to="/add-marks">

                Marks

              </Link>

            </>

          )

        }


        {/* COORDINATOR */}

        {

          user.role === 'coordinator'
          && (

            <>

              <Link to="/coordinator-dashboard">

                Dashboard

              </Link>

              <Link to="/coordinator-notes">

                Notes

              </Link>

            </>

          )

        }


        {/* LOGOUT */}

        <button
          onClick={logout}
        >

          Logout

        </button>

      </div>

    </div>

  );

}

export default Header;
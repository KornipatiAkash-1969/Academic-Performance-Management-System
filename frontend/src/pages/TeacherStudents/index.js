import './index.css';

import {
  useEffect,
  useState
} from 'react';

import DashboardLayout from '../../components/common/DashboardLayout';

import {
  getStudents
} from '../../services/studentService';

function TeacherStudents() {

  // ======================================
  // STATES
  // ======================================

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ======================================
  // LOAD STUDENTS
  // ======================================

  useEffect(() => {

    loadStudents();

  }, []);

  const loadStudents =
    async () => {

    try {

      const response =
        await getStudents();

      console.log(
        'Students Response:',
        response
      );

      // FIX RESPONSE

      if (response.success) {

        setStudents(

          response.students || []

        );

      } else {

        setStudents([]);

      }

    } catch (error) {

      console.log(error);

      setStudents([]);

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout role="teacher" title="Students List">


      {/* CONTENT */}

      <div className="teacher-students-content">

        {/* TOP */}

        <div className="students-top">

          <h1>
            Students List
          </h1>

          <p>
            View all registered students
          </p>

        </div>


        {/* LOADING */}

        {

          loading
          ? (

            <div className="loading-box">

              Loading Students...

            </div>

          )
          : (

            <div className="students-grid">

              {

                students.length > 0
                ? (

                  students.map((student) => (

                    <div
                      key={student.id}
                      className="student-card"
                    >

                      {/* ICON */}

                      <div className="student-icon">

                        👨‍🎓

                      </div>


                      {/* NAME */}

                      <h3>

                        {student.name}

                      </h3>


                      {/* INFO */}

                      <p>

                        <strong>
                          Student ID:
                        </strong>

                        {' '}

                        {student.student_id}

                      </p>

                      <p>

                        <strong>
                          Email:
                        </strong>

                        {' '}

                        {student.email}

                      </p>

                      <p>

                        <strong>
                          Role:
                        </strong>

                        {' '}

                        {student.role}

                      </p>

                    </div>

                  ))

                )
                : (

                  <div className="empty-box">

                    No Students Available

                  </div>

                )

              }

            </div>

          )

        }

      </div>

    </DashboardLayout>
  );
}

export default TeacherStudents;
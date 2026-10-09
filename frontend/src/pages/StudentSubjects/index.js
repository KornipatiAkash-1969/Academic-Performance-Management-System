import './index.css';

import {
  useEffect,
  useState
} from 'react';

import DashboardLayout from '../../components/common/DashboardLayout';

import {
  getSubjects
} from '../../services/subjectService';

function StudentSubjects() {

  // ======================================
  // STATES
  // ======================================

  const [subjects, setSubjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ======================================
  // LOAD SUBJECTS
  // ======================================

  useEffect(() => {

    loadSubjects();

  }, []);

  const loadSubjects =
    async () => {

    try {

      const response =
        await getSubjects();

      console.log(response);

      // IMPORTANT FIX

      setSubjects(

        response.subjects || []

      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout role="student" title="My Subjects">


      {/* CONTENT */}

      <div className="student-subjects-content">

        {/* TOP */}

        <div className="subjects-top">

          <h1>
            My Subjects
          </h1>

          <p>
            View all enrolled academic subjects
          </p>

        </div>


        {/* LOADING */}

        {

          loading
          ? (

            <div className="loading-box">

              Loading Subjects...

            </div>

          )
          : (

            <div className="subject-grid">

              {

                subjects.length > 0
                ? (

                  subjects.map((subject) => (

                    <div
                      key={subject.id}
                      className="subject-card"
                    >

                      {/* ICON */}

                      <div className="subject-icon">

                        📘

                      </div>


                      {/* SUBJECT NAME */}

                      <h3>

                        {subject.subject_name}

                      </h3>


                      {/* SUBJECT ID */}

                      <p>

                        <strong>
                          Subject ID:
                        </strong>

                        {' '}

                        {

                          subject.subject_id ||

                          `SUB-${subject.id}`

                        }

                      </p>


                      {/* SEMESTER */}

                      <p>

                        <strong>
                          Semester:
                        </strong>

                        {' '}

                        {subject.semester}

                      </p>

                    </div>

                  ))

                )
                : (

                  <div className="empty-box">

                    No Subjects Available

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

export default StudentSubjects;
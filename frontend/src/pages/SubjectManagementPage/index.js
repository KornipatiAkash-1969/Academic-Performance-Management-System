import './index.css';

import {
  useEffect,
  useState
} from 'react';

import DashboardLayout from '../../components/common/DashboardLayout';

import {

  createSubject,
  getSubjects

} from '../../services/subjectService';

function SubjectManagementPage() {

  // ======================================
  // STATES
  // ======================================

  const [subjects, setSubjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [createdSubject, setCreatedSubject] =
    useState(null);

  const [formData, setFormData] =
    useState({

      subject_name: '',
      semester: ''

    });

  // ======================================
  // LOAD SUBJECTS
  // ======================================

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

  useEffect(() => {

    loadSubjects();

  }, []);

  // ======================================
  // HANDLE INPUT
  // ======================================

  const handleChange =
    (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  // ======================================
  // SUBMIT FORM
  // ======================================

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      const response =
        await createSubject(formData);

      console.log(response);

      // SAVE SUBJECT

      setCreatedSubject(
        response.subject
      );

      alert(
        'Subject Created Successfully'
      );

      // RESET FORM

      setFormData({

        subject_name: '',
        semester: ''

      });

      // RELOAD SUBJECTS

      loadSubjects();

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        error.response?.data?.error ||

        'Failed To Create Subject'

      );

    }

  };

  return (

    <DashboardLayout role="teacher" title="Subject Management">


      {/* CONTENT */}

      <div className="subject-content">

        {/* TOP */}

        <div className="subject-top">

          <h1>
            Subject Management
          </h1>

          <p>
            Create and manage academic subjects
          </p>

        </div>


        {/* FORM */}

        <form
          className="subject-form"
          onSubmit={handleSubmit}
        >

          {/* SUBJECT NAME */}

          <div className="input-group">

            <label>
              Subject Name
            </label>

            <input
              type="text"
              name="subject_name"
              placeholder="Enter Subject Name"
              value={formData.subject_name}
              onChange={handleChange}
              required
            />

          </div>


          {/* SEMESTER */}

          <div className="input-group">

            <label>
              Semester
            </label>

            <input
              type="number"
              name="semester"
              placeholder="Enter Semester"
              value={formData.semester}
              onChange={handleChange}
              required
            />

          </div>


          {/* BUTTON */}

          <button type="submit">

            Create Subject

          </button>

        </form>


        {/* SUCCESS CARD */}

        {

          createdSubject && (

            <div className="created-subject-card">

              <h2>
                Subject Created Successfully
              </h2>

              <p>

                <strong>
                  Subject ID:
                </strong>

                {' '}

                {createdSubject.subject_id}

              </p>

              <p>

                <strong>
                  Subject Name:
                </strong>

                {' '}

                {createdSubject.subject_name}

              </p>

              <p>

                <strong>
                  Semester:
                </strong>

                {' '}

                {createdSubject.semester}

              </p>

            </div>

          )

        }


        {/* SUBJECT LIST */}

        <div className="subject-list-section">

          <h2>
            Available Subjects
          </h2>

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

                        <div className="subject-icon">

                          📘

                        </div>

                        <h3>

                          {subject.subject_name}

                        </h3>

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

                      No Subjects Found

                    </div>

                  )

                }

              </div>

            )

          }

        </div>

      </div>

    </DashboardLayout>
  );
}

export default SubjectManagementPage;
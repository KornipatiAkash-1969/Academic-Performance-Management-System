import './index.css';

import {
  useState
} from 'react';

import DashboardLayout from '../../components/common/DashboardLayout';

import {
  createStudent
} from '../../services/studentService';

function AddStudentPage() {

  const [formData, setFormData] =
    useState({

      name: '',
      email: '',
      password: '',
      role: 'student'

    });

  const [loading, setLoading] =
    useState(false);

  const [createdStudent, setCreatedStudent] =
    useState(null);

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

    setLoading(true);

    try {

      const response =
        await createStudent(formData);

      console.log(response);

      // STORE CREATED STUDENT

      setCreatedStudent(
        response.user
      );

      alert(
        'Student Added Successfully'
      );

      // RESET FORM

      setFormData({

        name: '',
        email: '',
        password: '',
        role: 'student'

      });

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        'Failed To Add Student'

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout role="teacher" title="Add Student">


      {/* CONTENT */}

      <div className="student-content">

        {/* TOP */}

        <div className="student-top">

          <h1>
            Add Student
          </h1>

          <p>
            Create new student account
          </p>

        </div>


        {/* FORM */}

        <form
          className="student-form"
          onSubmit={handleSubmit}
        >

          {/* NAME */}

          <div className="input-group">

            <label>
              Student Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter Student Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* EMAIL */}

          <div className="input-group">

            <label>
              Student Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Student Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >

            {

              loading
              ? 'Adding Student...'
              : 'Add Student'

            }

          </button>

        </form>


        {/* CREATED STUDENT CARD */}

        {

          createdStudent && (

            <div className="student-card">

              <h2>
                Student Created Successfully
              </h2>

              <div className="student-info">

                <p>

                  <strong>
                    Student ID:
                  </strong>

                  {' '}

                  {createdStudent.student_id}

                </p>

                <p>

                  <strong>
                    Name:
                  </strong>

                  {' '}

                  {createdStudent.name}

                </p>

                <p>

                  <strong>
                    Email:
                  </strong>

                  {' '}

                  {createdStudent.email}

                </p>

                <p>

                  <strong>
                    Role:
                  </strong>

                  {' '}

                  {createdStudent.role}

                </p>

              </div>

            </div>

          )

        }

      </div>

    </DashboardLayout>
  );
}

export default AddStudentPage;
import './index.css';

import {
  useState
} from 'react';

import DashboardLayout from '../../components/common/DashboardLayout';

import {
  registerUser
} from '../../services/authService';

function CreateTeacher() {

  // ======================================
  // STATES
  // ======================================

  const [formData, setFormData] =
    useState({

      name: '',
      email: '',
      password: '',
      role: 'teacher'

    });

  const [loading, setLoading] =
    useState(false);

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
  // SUBMIT
  // ======================================

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await registerUser(formData);

      alert(
        'Teacher Created Successfully'
      );

      setFormData({

        name: '',
        email: '',
        password: '',
        role: 'teacher'

      });

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        'Failed To Create Teacher'

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout role="coordinator" title="Create Teacher">


      {/* CONTENT */}

      <div className="create-teacher-content">

        <div className="teacher-top">

          <h1>
            Create Teacher
          </h1>

          <p>
            Create teacher accounts
          </p>

        </div>


        {/* FORM */}

        <form
          className="teacher-form"
          onSubmit={handleSubmit}
        >

          {/* NAME */}

          <div className="input-group">

            <label>
              Teacher Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter Teacher Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* EMAIL */}

          <div className="input-group">

            <label>
              Teacher Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Teacher Email"
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
              ? 'Creating Teacher...'
              : 'Create Teacher'

            }

          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default CreateTeacher;
import './index.css';

import {
  useState,
  useEffect
} from 'react';

import {
  Link
} from 'react-router-dom';

import DashboardLayout from '../../components/common/DashboardLayout';

import NotesList
from '../../components/common/NotesList';

import {
  getDashboardSummary
} from '../../services/dashboardService';

function TeacherDashboard() {

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

  const [summary, setSummary] = useState({
    totalStudents: 0,
    totalSubjects: 0,
    averageMarks: 0,
    highestPercentage: 0
  });

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const res = await getDashboardSummary();
      if (res && res.success && res.data) {
        setSummary(res.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard summary:', err);
    }
  };

  return (

    <DashboardLayout role="teacher" title="Teacher Dashboard">


      {/* CONTENT */}

      <div className="teacher-content">

        {/* PAGE TOP */}

        <div className="dashboard-top">

          <div>

            <h1>
              Teacher Dashboard
            </h1>

            <p>
              Manage students, subjects and marks
            </p>

          </div>

        </div>


        {/* PROFILE CARD */}

        <div className="teacher-card">

          {/* AVATAR */}

          <div className="teacher-avatar">

            {

              user.name
              ? user.name.charAt(0)
              : 'T'

            }

          </div>


          {/* DETAILS */}

          <div className="teacher-details">

            <h2>

              Welcome,
              {' '}

              {user.name || 'Teacher'}

            </h2>


            {/* INFO GRID */}

            <div className="teacher-info-grid">

              {/* TEACHER ID */}

              <div className="info-box">

                <span>
                  Teacher ID
                </span>

                <h3>

                  {

                    user.student_id
                    ? user.student_id
                    : `TEACHER-${user.id}`

                  }

                </h3>

              </div>


              {/* EMAIL */}

              <div className="info-box">

                <span>
                  Email
                </span>

                <h3>

                  {user.email || 'N/A'}

                </h3>

              </div>


              {/* ROLE */}

              <div className="info-box">

                <span>
                  Role
                </span>

                <h3>

                  {user.role || 'teacher'}

                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* STATS OVERVIEW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '35px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '18px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)', borderLeft: '5px solid #2563EB' }}>
            <span style={{ color: '#64748B', fontSize: '14px', fontWeight: '500' }}>Total Students</span>
            <h2 style={{ margin: '8px 0 0', color: '#0F172A', fontSize: '28px' }}>{summary.totalStudents}</h2>
          </div>
          <div style={{ background: 'white', padding: '24px', borderRadius: '18px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)', borderLeft: '5px solid #10B981' }}>
            <span style={{ color: '#64748B', fontSize: '14px', fontWeight: '500' }}>Total Subjects</span>
            <h2 style={{ margin: '8px 0 0', color: '#0F172A', fontSize: '28px' }}>{summary.totalSubjects}</h2>
          </div>
          <div style={{ background: 'white', padding: '24px', borderRadius: '18px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)', borderLeft: '5px solid #F59E0B' }}>
            <span style={{ color: '#64748B', fontSize: '14px', fontWeight: '500' }}>Class Average</span>
            <h2 style={{ margin: '8px 0 0', color: '#0F172A', fontSize: '28px' }}>
              {Number(summary.averageMarks || 0).toFixed(1)}%
            </h2>
          </div>
          <div style={{ background: 'white', padding: '24px', borderRadius: '18px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)', borderLeft: '5px solid #8B5CF6' }}>
            <span style={{ color: '#64748B', fontSize: '14px', fontWeight: '500' }}>Highest Score</span>
            <h2 style={{ margin: '8px 0 0', color: '#0F172A', fontSize: '28px' }}>
              {Number(summary.highestPercentage || 0).toFixed(1)}%
            </h2>
          </div>
        </div>

        {/* DASHBOARD GRID */}

        <div className="dashboard-grid">

          {/* SUBJECTS */}

          <Link
            to="/subjects"
            className="dashboard-box"
          >

            <div className="box-icon">

              📘

            </div>

            <h3>
              Subjects
            </h3>

            <p>
              Create and manage subjects
            </p>

          </Link>


          {/* STUDENTS */}

          <Link
            to="/teacher-students"
            className="dashboard-box"
          >

            <div className="box-icon">

              👨‍🎓

            </div>

            <h3>
              Students List
            </h3>

            <p>
              View registered students
            </p>

          </Link>

          {/* ADD STUDENT */}

          <Link
            to="/add-student"
            className="dashboard-box"
          >

            <div className="box-icon">

              ➕

            </div>

            <h3>
              Add Student
            </h3>

            <p>
              Create new student accounts
            </p>

          </Link>

          {/* MARKS */}

          <Link
            to="/add-marks"
            className="dashboard-box"
          >

            <div className="box-icon">

              📝

            </div>

            <h3>
              Marks Management
            </h3>

            <p>
              Add and manage student marks
            </p>

          </Link>

        </div>


        {/* NOTES SECTION */}

        <div className="notes-section">

          <div className="notes-header">

            <h2>
              Coordinator Notes
            </h2>

          </div>

          <NotesList />

        </div>

      </div>

    </DashboardLayout>
  );
}

export default TeacherDashboard;
import './index.css';

import {
  useState,
  useEffect
} from 'react';

import DashboardLayout from '../../components/common/DashboardLayout';

import {
  addMarks,
  getMarks,
  deleteMark
} from '../../services/marksService';

import {
  getStudents
} from '../../services/studentService';

import {
  getSubjects
} from '../../services/subjectService';

import {
  getAssessments
} from '../../services/assessmentService';

function AddMarksPage() {

  // ======================================
  // STATES
  // ======================================

  const [formData, setFormData] =
    useState({
      student_id: '',
      subject_id: '',
      assessment_id: '',
      marks_obtained: ''
    });

  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [marksList, setMarksList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [marksLoading, setMarksLoading] = useState(true);

  useEffect(() => {
    loadDropdownData();
    loadMarksList();
  }, []);

  const loadDropdownData = async () => {
    try {
      const [stuRes, subRes, asstRes] = await Promise.all([
        getStudents(),
        getSubjects(),
        getAssessments()
      ]);

      if (stuRes && stuRes.students) {
        setStudents(stuRes.students);
      }
      if (subRes && subRes.subjects) {
        setSubjects(subRes.subjects);
      }
      if (asstRes && asstRes.assessments) {
        setAssessments(asstRes.assessments);
      } else if (Array.isArray(asstRes)) {
        setAssessments(asstRes);
      }
    } catch (err) {
      console.error('Error loading dropdown options:', err);
    }
  };

  const loadMarksList = async () => {
    try {
      const res = await getMarks();
      if (res && res.marks) {
        setMarksList(res.marks);
      }
    } catch (err) {
      console.error('Error loading marks:', err);
    } finally {
      setMarksLoading(false);
    }
  };

  // ======================================
  // HANDLE INPUT
  // ======================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ======================================
  // SUBMIT FORM
  // ======================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addMarks(formData);

      alert('Marks Added Successfully');

      // RESET FORM
      setFormData({
        student_id: '',
        subject_id: '',
        assessment_id: '',
        marks_obtained: ''
      });

      // Reload marks
      loadMarksList();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        'Failed To Add Marks'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMark = async (id) => {
    if (!window.confirm('Are you sure you want to delete this mark entry?')) return;
    try {
      await deleteMark(id);
      loadMarksList();
    } catch (err) {
      console.error('Failed to delete mark:', err);
      alert('Failed to delete mark entry');
    }
  };

  return (
    <DashboardLayout role="teacher" title="Add Student Marks">

      {/* CONTENT */}
      <div className="marks-content">
        {/* TOP */}
        <div className="marks-top">
          <h1>Add Student Marks</h1>
          <p>Select student, subject, assessment and enter marks</p>
        </div>

        {/* FORM */}
        <form className="marks-form" onSubmit={handleSubmit}>
          {/* STUDENT ID */}
          <div className="input-group">
            <label>Select Student</label>
            <select
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose Student --</option>
              {students.map((stu) => (
                <option key={stu.id} value={stu.student_id}>
                  {stu.name} ({stu.student_id})
                </option>
              ))}
            </select>
            <small>Or enter Student ID below if not listed</small>
            <input
              type="text"
              name="student_id"
              placeholder="Or type Student ID (e.g. STU123456)"
              value={formData.student_id}
              onChange={handleChange}
              style={{ marginTop: '8px' }}
            />
          </div>

          {/* SUBJECT ID */}
          <div className="input-group">
            <label>Select Subject</label>
            <select
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose Subject --</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.subject_id}>
                  {sub.subject_name} ({sub.subject_id}) - Sem {sub.semester}
                </option>
              ))}
            </select>
            <small>Or enter Subject ID below if not listed</small>
            <input
              type="text"
              name="subject_id"
              placeholder="Or type Subject ID (e.g. MAT101)"
              value={formData.subject_id}
              onChange={handleChange}
              style={{ marginTop: '8px' }}
            />
          </div>

          {/* ASSESSMENT ID */}
          <div className="input-group">
            <label>Select Assessment</label>
            <select
              name="assessment_id"
              value={formData.assessment_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose Assessment --</option>
              {assessments.map((asst) => (
                <option key={asst.id} value={asst.assessment_id}>
                  {asst.title} ({asst.assessment_id}) - Max {asst.total_marks} Marks
                </option>
              ))}
            </select>
            <small>Or enter Assessment ID below if not listed</small>
            <input
              type="text"
              name="assessment_id"
              placeholder="Or type Assessment ID (e.g. INT-1)"
              value={formData.assessment_id}
              onChange={handleChange}
              style={{ marginTop: '8px' }}
            />
          </div>

          {/* MARKS */}
          <div className="input-group">
            <label>Marks Obtained (out of 100)</label>
            <input
              type="number"
              name="marks_obtained"
              placeholder="Enter Marks (0-100)"
              value={formData.marks_obtained}
              onChange={handleChange}
              required
              min="0"
              max="100"
            />
          </div>

          {/* BUTTON */}
          <button type="submit" disabled={loading}>
            {loading ? 'Adding Marks...' : 'Add Marks'}
          </button>
        </form>

        {/* MARKS LIST SECTION */}
        <div style={{ marginTop: '50px' }}>
          <h2 style={{ color: '#0F172A', marginBottom: '20px', fontSize: '26px' }}>
            Recorded Student Marks
          </h2>

          {marksLoading ? (
            <p>Loading recorded marks...</p>
          ) : marksList.length === 0 ? (
            <div style={{ background: 'white', padding: '30px', borderRadius: '16px', color: '#64748B' }}>
              No marks recorded yet.
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: '20px', overflowX: 'auto', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
              <table style={{ width: '100%', minWidth: '680px', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ padding: '16px 20px', color: '#475569', fontSize: '14px' }}>Student</th>
                    <th style={{ padding: '16px 20px', color: '#475569', fontSize: '14px' }}>Student ID</th>
                    <th style={{ padding: '16px 20px', color: '#475569', fontSize: '14px' }}>Subject</th>
                    <th style={{ padding: '16px 20px', color: '#475569', fontSize: '14px' }}>Assessment</th>
                    <th style={{ padding: '16px 20px', color: '#475569', fontSize: '14px' }}>Marks</th>
                    <th style={{ padding: '16px 20px', color: '#475569', fontSize: '14px' }}>Grade</th>
                    <th style={{ padding: '16px 20px', color: '#475569', fontSize: '14px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {marksList.map((m) => (
                    <tr key={m.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '16px 20px', fontWeight: '600', color: '#0F172A' }}>
                        {m.student_name || 'N/A'}
                      </td>
                      <td style={{ padding: '16px 20px', color: '#64748B' }}>
                        {m.student_id}
                      </td>
                      <td style={{ padding: '16px 20px', color: '#0F172A' }}>
                        {m.subject_name || m.subject_id}
                      </td>
                      <td style={{ padding: '16px 20px', color: '#64748B' }}>
                        {m.assessment_title || m.assessment_id}
                      </td>
                      <td style={{ padding: '16px 20px', fontWeight: '600', color: '#2563EB' }}>
                        {m.marks_obtained}/100 ({m.percentage}%)
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          background: m.grade === 'F' ? '#FEE2E2' : '#DCFCE7',
                          color: m.grade === 'F' ? '#DC2626' : '#16A34A',
                          fontWeight: 'bold',
                          fontSize: '13px'
                        }}>
                          {m.grade}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <button
                          onClick={() => handleDeleteMark(m.id)}
                          style={{
                            padding: '6px 12px',
                            background: '#EF4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddMarksPage;
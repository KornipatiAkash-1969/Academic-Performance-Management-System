const db = require('../database/db');
const calculateGrade = require('../services/gradeService');

// ======================================
// ADD MARKS
// ======================================
const addMarks = (req, res) => {
  const {
    student_id,
    subject_id,
    assessment_id,
    marks_obtained
  } = req.body;

  // VALIDATION
  if (
    !student_id ||
    !subject_id ||
    !assessment_id ||
    marks_obtained === '' ||
    marks_obtained === undefined ||
    marks_obtained === null
  ) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  const marksNum = Number(marks_obtained);
  if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
    return res.status(400).json({
      success: false,
      message: 'Marks obtained must be a number between 0 and 100'
    });
  }

  const percentage = marksNum;
  const grade = calculateGrade(percentage);

  // INSERT MARKS
  db.run(
    `INSERT INTO marks (
      student_id,
      subject_id,
      assessment_id,
      marks_obtained,
      percentage,
      grade
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      student_id,
      subject_id,
      assessment_id,
      marksNum,
      percentage,
      grade
    ],
    function(err) {
      if (err) {
        console.error('Error adding marks:', err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Marks Added Successfully',
        mark: {
          id: this.lastID,
          student_id,
          subject_id,
          assessment_id,
          marks_obtained: marksNum,
          percentage,
          grade
        }
      });
    }
  );
};

// ======================================
// GET ALL MARKS
// ======================================
const getMarks = (req, res) => {
  db.all(
    `SELECT
      marks.id,
      marks.student_id,
      marks.subject_id,
      marks.assessment_id,
      marks.marks_obtained,
      marks.percentage,
      marks.grade,
      users.name AS student_name,
      COALESCE(subjects.subject_name, marks.subject_id) AS subject_name,
      COALESCE(assessments.title, marks.assessment_id) AS assessment_title
    FROM marks
    LEFT JOIN users
      ON (marks.student_id = users.student_id OR marks.student_id = CAST(users.id AS TEXT))
    LEFT JOIN subjects
      ON (marks.subject_id = subjects.subject_id OR marks.subject_id = CAST(subjects.id AS TEXT))
    LEFT JOIN assessments
      ON (marks.assessment_id = assessments.assessment_id OR marks.assessment_id = CAST(assessments.id AS TEXT))
    ORDER BY marks.id DESC`,
    [],
    (err, rows) => {
      if (err) {
        console.error('Error getting marks:', err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      return res.status(200).json({
        success: true,
        marks: rows
      });
    }
  );
};

// ======================================
// GET STUDENT MARKS
// ======================================
const getStudentMarks = (req, res) => {
  const studentTextId = req.user?.student_id;
  const studentNumericId = String(req.user?.id || '');

  db.all(
    `SELECT
      marks.id,
      marks.student_id,
      marks.subject_id,
      marks.assessment_id,
      marks.marks_obtained,
      marks.percentage,
      marks.grade,
      COALESCE(subjects.subject_name, marks.subject_id) AS subject_name,
      COALESCE(assessments.title, marks.assessment_id) AS assessment_title
    FROM marks
    LEFT JOIN subjects
      ON (marks.subject_id = subjects.subject_id OR marks.subject_id = CAST(subjects.id AS TEXT))
    LEFT JOIN assessments
      ON (marks.assessment_id = assessments.assessment_id OR marks.assessment_id = CAST(assessments.id AS TEXT))
    WHERE marks.student_id = ? OR marks.student_id = ?
    ORDER BY marks.id DESC`,
    [studentTextId, studentNumericId],
    (err, rows) => {
      if (err) {
        console.error('Error getting student marks:', err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      return res.status(200).json({
        success: true,
        marks: rows
      });
    }
  );
};

// ======================================
// DELETE MARK
// ======================================
const deleteMark = (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM marks WHERE id = ?`,
    [id],
    function(err) {
      if (err) {
        console.error('Error deleting mark:', err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Mark Deleted Successfully'
      });
    }
  );
};

module.exports = {
  addMarks,
  getMarks,
  getStudentMarks,
  deleteMark
};
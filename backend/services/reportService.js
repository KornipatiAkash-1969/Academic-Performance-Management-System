const db = require('../database/db');

exports.getStudentReport = (studentId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT 
        COALESCE(subjects.subject_name, marks.subject_id) AS subject_name,
        marks.marks_obtained,
        marks.percentage,
        marks.grade,
        COALESCE(assessments.title, marks.assessment_id) AS assessment_title
      FROM marks
      LEFT JOIN subjects
        ON (marks.subject_id = subjects.subject_id OR marks.subject_id = CAST(subjects.id AS TEXT))
      LEFT JOIN assessments
        ON (marks.assessment_id = assessments.assessment_id OR marks.assessment_id = CAST(assessments.id AS TEXT))
      WHERE marks.student_id = ? 
         OR marks.student_id = CAST(? AS TEXT)
         OR marks.student_id = (SELECT student_id FROM users WHERE id = ?)
      ORDER BY marks.id DESC`,
      [studentId, studentId, studentId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};
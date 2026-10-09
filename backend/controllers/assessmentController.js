const db = require('../database/db');

exports.createAssessment = (req, res) => {
  const { assessment_id, assessment_type, title, total_marks } = req.body;
  const asstTitle = title || assessment_type;

  if (!asstTitle || !total_marks) {
    return res.status(400).json({
      success: false,
      message: 'Assessment title and total marks are required'
    });
  }

  const asstId = assessment_id || `ASM-${Math.floor(100 + Math.random() * 900)}`;

  db.run(
    'INSERT INTO assessments(assessment_id, title, total_marks) VALUES(?, ?, ?)',
    [asstId, asstTitle, total_marks],
    function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      res.status(201).json({
        success: true,
        assessmentId: this.lastID,
        assessment_id: asstId,
        title: asstTitle,
        total_marks
      });
    }
  );
};

exports.getAssessments = (req, res) => {
  db.all('SELECT * FROM assessments ORDER BY id ASC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      assessments: rows
    });
  });
};
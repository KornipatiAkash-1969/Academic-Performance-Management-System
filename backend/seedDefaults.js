const db = require('./database/db');

db.serialize(() => {
  db.run(`INSERT OR IGNORE INTO subjects (subject_id, subject_name, semester) VALUES 
    ('MAT101', 'Mathematics', 1),
    ('PHY101', 'Physics', 1),
    ('CSE101', 'Computer Science', 1)`, (err) => {
    if (err) console.error('Subjects err:', err.message);
    else console.log('Subjects seeded');
  });

  db.get("SELECT COUNT(*) as count FROM notes", (err, row) => {
    if (!err && row.count === 0) {
      db.run(`INSERT INTO notes (title, message, created_by) VALUES
        ('Semester 1 Internal Exams Announced', 'The internal examinations for Semester 1 will commence next Monday. All students are advised to prepare accordingly.', 1),
        ('Welcome to the New Academic Session', 'Welcome all students and faculty members. Please ensure all subject registrations are completed on time.', 1)`, (e) => {
        if (e) console.error('Notes err:', e.message);
        else console.log('Notes seeded');
      });
    }
  });

  db.get("SELECT COUNT(*) as count FROM marks", (err, row) => {
    if (!err && row.count === 0) {
      db.run(`INSERT INTO marks (student_id, subject_id, assessment_id, marks_obtained, percentage, grade) VALUES
        ('STU795003219', 'MAT101', 'INT-1', 88, 88.0, 'A'),
        ('STU795003219', 'PHY101', 'INT-1', 92, 92.0, 'A+'),
        ('STU795003219', 'CSE101', 'INT-1', 95, 95.0, 'A+')`, (e) => {
        if (e) console.error('Marks err:', e.message);
        else console.log('Marks seeded');
      });
    }
  });
});

setTimeout(() => {
  console.log('Seeding check completed.');
  process.exit(0);
}, 1000);

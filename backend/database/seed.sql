-- ======================================
-- DEFAULT USERS (Password: 123456)
-- ======================================

INSERT OR IGNORE INTO users
(
  id,
  student_id,
  name,
  email,
  password,
  role
)
VALUES
(
  1,
  'COR787574501',
  'Coordinator One',
  'coordinator@example.com',
  '$2b$10$1INy.WuqfldOKKLocOIrTehck32/TbvUkmck2JmGL72Nj/kyF2Zfy',
  'coordinator'
),
(
  2,
  'STU795003219',
  'Student One',
  'student@example.com',
  '$2b$10$gwStuD.hiAZ3MUrDFo8LHeVzolRcCkMqkSsexpOcSbyXffqAjByRS',
  'student'
),
(
  3,
  'TEA799532798',
  'Teacher One',
  'teacher@example.com',
  '$2b$10$B4hMqtdCEcoYkbRDuQRw/eyRyLZZXWHVw1AXC0zcy2hUqxWdBOL8e',
  'teacher'
);

-- ======================================
-- ASSESSMENTS
-- ======================================

INSERT OR IGNORE INTO assessments
(
  assessment_id,
  title,
  total_marks
)
VALUES
(
  'INT-1',
  'Internal Exam',
  100
),
(
  'MID-1',
  'Mid-Term Exam',
  100
),
(
  'FIN-1',
  'Final Exam',
  100
);

-- ======================================
-- GRADES TABLE
-- ======================================

CREATE TABLE IF NOT EXISTS grades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  min_percentage INTEGER,
  max_percentage INTEGER,
  grade TEXT
);

-- ======================================
-- INSERT GRADES
-- ======================================

INSERT OR IGNORE INTO grades
(
  id,
  min_percentage,
  max_percentage,
  grade
)
VALUES
(1, 90, 100, 'A+'),
(2, 80, 89, 'A'),
(3, 70, 79, 'B'),
(4, 60, 69, 'C'),
(5, 50, 59, 'D'),
(6, 0, 49, 'F');

-- ======================================
-- DEFAULT SUBJECTS
-- ======================================

INSERT OR IGNORE INTO subjects
(
  id,
  subject_id,
  subject_name,
  semester
)
VALUES
(1, 'MAT101', 'Mathematics', 1),
(2, 'PHY101', 'Physics', 1),
(3, 'CSE101', 'Computer Science', 1);

-- ======================================
-- DEFAULT NOTES
-- ======================================

INSERT OR IGNORE INTO notes
(
  id,
  title,
  message,
  target_role,
  created_by
)
VALUES
(
  1,
  'Semester 1 Internal Exams Announced',
  'The internal examinations for Semester 1 will commence next Monday. All students are advised to prepare accordingly.',
  'student',
  1
),
(
  2,
  'Faculty Meeting on Curriculum Planning',
  'All teachers are requested to attend the faculty meeting this Thursday regarding next semester planning.',
  'teacher',
  1
),
(
  3,
  'Welcome to the New Academic Session',
  'Welcome all students and faculty members. Please ensure all registrations and syllabi are updated.',
  'both',
  1
);

-- ======================================
-- DEFAULT SAMPLE MARKS
-- ======================================

INSERT OR IGNORE INTO marks
(
  id,
  student_id,
  subject_id,
  assessment_id,
  marks_obtained,
  percentage,
  grade
)
VALUES
(1, 'STU795003219', 'MAT101', 'INT-1', 88, 88.0, 'A'),
(2, 'STU795003219', 'PHY101', 'INT-1', 92, 92.0, 'A+'),
(3, 'STU795003219', 'CSE101', 'INT-1', 95, 95.0, 'A+');
CREATE TABLE IF NOT EXISTS users (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  student_id TEXT UNIQUE,

  name TEXT NOT NULL,

  email TEXT UNIQUE NOT NULL,

  password TEXT NOT NULL,

  role TEXT NOT NULL

);


CREATE TABLE IF NOT EXISTS subjects (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  subject_id TEXT UNIQUE,

  subject_name TEXT NOT NULL,

  semester INTEGER NOT NULL

);


CREATE TABLE IF NOT EXISTS assessments (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  assessment_id TEXT UNIQUE,

  title TEXT NOT NULL,

  total_marks INTEGER NOT NULL

);


CREATE TABLE IF NOT EXISTS marks (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  student_id TEXT,

  subject_id TEXT,

  assessment_id TEXT,

  marks_obtained INTEGER,

  percentage REAL,

  grade TEXT

);


CREATE TABLE IF NOT EXISTS notes (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  title TEXT NOT NULL,

  message TEXT NOT NULL,

  target_role TEXT DEFAULT 'both',

  created_by INTEGER,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);
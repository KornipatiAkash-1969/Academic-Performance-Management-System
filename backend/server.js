const express = require('express');

const cors = require('cors');

require('dotenv').config();


// ======================================
// ROUTES
// ======================================

// AUTH
const authRoutes =
require('./routes/auth');

// STUDENTS
const studentRoutes =
require('./routes/students');

// SUBJECTS
const subjectRoutes =
require('./routes/subjects');

// ASSESSMENTS
const assessmentRoutes =
require('./routes/assessments');

// MARKS
const marksRoutes =
require('./routes/marks');

// DASHBOARD
const dashboardRoutes =
require('./routes/dashboard');

// REPORTS
const reportRoutes =
require('./routes/reports');

// NOTES
const notesRoutes =
require('./routes/notes');


// ======================================
// MIDDLEWARE
// ======================================

const errorMiddleware =
require('./middleware/errorMiddleware');


// ======================================
// EXPRESS APP
// ======================================

const app = express();


// ======================================
// GLOBAL MIDDLEWARE
// ======================================

// ENABLE CORS
app.use(cors());

// PARSE JSON
app.use(express.json());


// ======================================
// API ROUTES
// ======================================

// AUTH ROUTES
app.use(
  '/api/auth',
  authRoutes
);

// STUDENT ROUTES
app.use(
  '/api/students',
  studentRoutes
);

// SUBJECT ROUTES
app.use(
  '/api/subjects',
  subjectRoutes
);

// ASSESSMENT ROUTES
app.use(
  '/api/assessments',
  assessmentRoutes
);

// MARKS ROUTES
app.use(
  '/api/marks',
  marksRoutes
);

// DASHBOARD ROUTES
app.use(
  '/api/dashboard',
  dashboardRoutes
);

// REPORT ROUTES
app.use(
  '/api/reports',
  reportRoutes
);

// NOTES ROUTES
app.use(
  '/api/notes',
  notesRoutes
);


// ======================================
// ROOT ROUTE
// ======================================

app.get('/', (req, res) => {

  res.status(200).json({

    success: true,

    message:
    'Student Academic Performance Backend Running'

  });

});


// ======================================
// SERVE FRONTEND STATIC BUILD IN PRODUCTION
// ======================================
const path = require('path');
const fs = require('fs');
const frontendBuildPath = path.join(__dirname, '../frontend/build');

if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));

  app.get('*', (req, res) => {
    if (req.originalUrl.startsWith('/api')) {
      return res.status(404).json({
        success: false,
        message: 'API Route Not Found'
      });
    }
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
} else {
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route Not Found'
    });
  });
}


// ======================================
// ERROR HANDLER
// ======================================

app.use(errorMiddleware);


// ======================================
// SERVER
// ======================================

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});
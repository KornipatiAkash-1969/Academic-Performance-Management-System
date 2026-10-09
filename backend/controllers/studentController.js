const bcrypt =
require('bcryptjs');

const db =
require('../database/db');


// ======================================
// GENERATE STUDENT ID
// ======================================

const generateStudentId =
() => {

  const random =
    Math.floor(

      100000 + Math.random() * 900000

    );

  return `STU${random}`;

};


// ======================================
// ADD STUDENT
// ======================================

const addStudent =
async (req, res) => {

  const {

    name,
    email,
    password

  } = req.body;

  // VALIDATION

  if (

    !name ||
    !email ||
    !password

  ) {

    return res.status(400).json({

      success: false,

      message:
      'All fields are required'

    });

  }

  try {

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(

        password,
        10

      );

    // GENERATE ID

    const studentId =
      generateStudentId();

    // INSERT

    db.run(

      `
      INSERT INTO users (

        student_id,
        name,
        email,
        password,
        role

      )

      VALUES (?, ?, ?, ?, ?)
      `,

      [

        studentId,
        name,
        email,
        hashedPassword,
        'student'

      ],

      function(err) {

        if (err) {

          console.log(err);

          return res.status(500).json({

            success: false,

            message:
            err.message

          });

        }

        return res.status(201).json({

          success: true,

          message:
          'Student Added Successfully',

          user: {
            id: this.lastID,
            student_id: studentId,
            name: name,
            email: email,
            role: 'student'
          }

        });

      }

    );

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message:
      'Server Error'

    });

  }

};


// ======================================
// GET STUDENTS
// ======================================

const getStudents =
(req, res) => {

  db.all(

    `
    SELECT

      id,
      student_id,
      name,
      email,
      role

    FROM users

    WHERE role = 'student'

    ORDER BY id DESC
    `,

    [],

    (err, rows) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          success: false,

          message:
          err.message

        });

      }

      console.log(rows);

      return res.status(200).json({

        success: true,

        students:
        rows

      });

    }

  );

};


// ======================================
// EXPORTS
// ======================================

module.exports = {

  addStudent,
  getStudents

};
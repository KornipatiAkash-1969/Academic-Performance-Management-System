const bcrypt =
require('bcryptjs');

const db =
require('../database/db');

const generateToken =
require('../utils/generateToken');


// ======================================
// GENERATE USER ID
// ======================================

const generateUserId =
(role) => {

  const time =
    Date.now()
      .toString()
      .slice(-6);

  const random =
    Math.floor(

      100 + Math.random() * 900

    );

  // TEACHER ID

  if (role === 'teacher') {

    return `TEA${time}${random}`;

  }

  // COORDINATOR ID

  if (role === 'coordinator') {

    return `COR${time}${random}`;

  }

  // STUDENT ID

  return `STU${time}${random}`;

};


// ======================================
// REGISTER USER
// ======================================

const registerUser =
(req, res) => {

  const {

    name,
    email,
    password,
    role

  } = req.body;

  // VALIDATION

  if (

    !name ||
    !email ||
    !password ||
    !role

  ) {

    return res.status(400).json({

      success: false,

      message:
      'All fields are required'

    });

  }

  // CHECK EXISTING EMAIL

  db.get(

    `
    SELECT * FROM users
    WHERE email = ?
    `,

    [email],

    async (err, user) => {

      // DATABASE ERROR

      if (err) {

        console.log(err);

        return res.status(500).json({

          success: false,

          message:
          err.message

        });

      }

      // EMAIL EXISTS

      if (user) {

        return res.status(400).json({

          success: false,

          message:
          'Email already exists'

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

        const generatedId =
          generateUserId(role);

        // INSERT USER

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

            generatedId,
            name,
            email,
            hashedPassword,
            role

          ],

          function(err) {

            // INSERT ERROR

            if (err) {

              console.log(err);

              return res.status(500).json({

                success: false,

                message:
                err.message

              });

            }

            // SUCCESS

            return res.status(201).json({

              success: true,

              message:
              'User Registered Successfully',

              user: {

                id:
                this.lastID,

                student_id:
                generatedId,

                name:
                name,

                email:
                email,

                role:
                role

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

    }

  );

};


// ======================================
// LOGIN USER
// ======================================

const loginUser =
(req, res) => {

  const {

    email,
    password

  } = req.body;

  // VALIDATION

  if (

    !email ||
    !password

  ) {

    return res.status(400).json({

      success: false,

      message:
      'Email and Password required'

    });

  }

  // FIND USER

  db.get(

    `
    SELECT * FROM users
    WHERE email = ?
    `,

    [email],

    async (err, user) => {

      // DATABASE ERROR

      if (err) {

        console.log(err);

        return res.status(500).json({

          success: false,

          message:
          err.message

        });

      }

      // USER NOT FOUND

      if (!user) {

        return res.status(401).json({

          success: false,

          message:
          'Invalid credentials'

        });

      }

      try {

        // CHECK PASSWORD

        const isMatch =
          await bcrypt.compare(

            password,
            user.password

          );

        // INVALID PASSWORD

        if (!isMatch) {

          return res.status(401).json({

            success: false,

            message:
            'Invalid credentials'

          });

        }

        // GENERATE TOKEN

        const token =
          generateToken(user);

        // SUCCESS RESPONSE

        return res.status(200).json({

          success: true,

          message:
          'Login Successful',

          token,

          user: {

            id:
            user.id,

            student_id:
            user.student_id,

            name:
            user.name,

            email:
            user.email,

            role:
            user.role

          }

        });

      } catch (error) {

        console.log(error);

        return res.status(500).json({

          success: false,

          message:
          'Server Error'

        });

      }

    }

  );

};


// GET CURRENT USER PROFILE
const getProfile = (req, res) => {
  const userId = req.user.id;
  db.get(
    `SELECT id, student_id, name, email, role FROM users WHERE id = ?`,
    [userId],
    (err, user) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({ success: true, user });
    }
  );
};

// UPDATE USER PROFILE
const updateProfile = (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  db.get(
    `SELECT id FROM users WHERE email = ? AND id != ?`,
    [email, userId],
    (err, existing) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Email is already in use by another account' });
      }

      db.run(
        `UPDATE users SET name = ?, email = ? WHERE id = ?`,
        [name, email, userId],
        function(updateErr) {
          if (updateErr) {
            return res.status(500).json({ success: false, message: updateErr.message });
          }

          db.get(
            `SELECT id, student_id, name, email, role FROM users WHERE id = ?`,
            [userId],
            (fetchErr, updatedUser) => {
              if (fetchErr) return res.status(500).json({ success: false, message: fetchErr.message });
              return res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                user: updatedUser
              });
            }
          );
        }
      );
    }
  );
};

// CHANGE USER PASSWORD
const changePassword = (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Current password and new password are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
  }

  db.get(`SELECT * FROM users WHERE id = ?`, [userId], async (err, user) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    try {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Current password is incorrect' });
      }

      const hashedNew = await bcrypt.hash(newPassword, 10);
      db.run(`UPDATE users SET password = ? WHERE id = ?`, [hashedNew, userId], (upErr) => {
        if (upErr) return res.status(500).json({ success: false, message: upErr.message });
        return res.status(200).json({ success: true, message: 'Password changed successfully' });
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.changePassword = changePassword;
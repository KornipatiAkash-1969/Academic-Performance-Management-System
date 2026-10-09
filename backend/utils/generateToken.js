const jwt =
require('jsonwebtoken');

const generateToken =
(user) => {

  return jwt.sign(

    {

      id:
      user.id,

      student_id:
      user.student_id,

      email:
      user.email,

      role:
      user.role

    },

    process.env.JWT_SECRET || 'studentperformancejwtsecret',

    {

      expiresIn: '7d'

    }

  );

};

module.exports =
generateToken;
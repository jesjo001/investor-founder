import jwt from 'jsonwebtoken';

// token verification
export const verifyToken = token =>
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) throw err;
    return payload;
  });

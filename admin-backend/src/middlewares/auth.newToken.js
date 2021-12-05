import jwt from 'jsonwebtoken';

// token generation
export const newToken = payload => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

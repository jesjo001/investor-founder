import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export default {
  async encrptPassword(password) {
    const pass = await bcrypt.hash(password, 8);
    return pass;
  },

  async verifyPassword(plainText, hashedText) {
    const isMatch = await bcrypt.compare(plainText, hashedText);
    return isMatch;
  },

  async generateToken(id, role, email,fullName) {
    const token = jwt.sign(
      {
        data: { id,role, email,fullName },
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
    return token;
  },
};

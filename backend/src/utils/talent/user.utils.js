import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

export default {
  async encrptPassword(password) {
    const pass = await bcrypt.hash(password, 8);
    return pass;
  },

  async verifyPassword(plainText, hashedText) {  
    try{
      const isMatch = await bcrypt.compare(plainText, hashedText);     
      return isMatch;
    }catch(err){

    }  
  }, 
};

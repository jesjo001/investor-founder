import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;
import User from './user.js';

const talentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },  
    biography: {
      type: String,
    }, 
    skills: [string],
    profileImage: {
      type: String,
    },
    // the talent/founder/investor who referred this talent
    referredBy: {
      type: ObjectId,
      ref: 'User',
    },
    // whether a talent referred or an investor referred
    refererType: {
      type: String,
      enum: ['Investor', 'Talent','Founder'],
    },
    // the talent this talent gave referal to
    referred: [{ type: ObjectId, ref: 'Refer' }],
  },
  { discriminatorKey: 'role' }
);

const Talent = User.discriminator('Talent', talentSchema);
export default Talent;

import mongoose from 'mongoose';
import {
  INDUSTRY_LOCATION,
  INDUSTRY_TYPE,
  INVESTMENT_TYPE,
  STAGE,
  TICKET_SIZE,
  PLAN_TYPE,
} from '../utils/constants.js';
import User from './user.js';
const { ObjectId } = mongoose.Schema.Types;

const profileImage = {
    avatar: { type: String, trim: true},
    avatarAwsDetails: { type: Object, trim: true },
}

const investorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    personal: {
      type: String,
      maxLength: 1024,
    },
    type: {
      type: String,
      enum: INVESTMENT_TYPE,
    },
    expertise: {
      type: String,
      maxLength: 1024,
    },
    investedIn: {
      type: String,
      maxLength: 1024,
    },
    ticketSize: {
      type: String,
      enum: TICKET_SIZE,
    },
    stage: {
      type: String,
      enum: STAGE,
    },
    industryType: {
      type: String,
      enum: INDUSTRY_TYPE,
    },
    industryLocation: {
      type: String,
      enum: INDUSTRY_LOCATION,
    },
    profileImage:profileImage,

    referred: [{ type: ObjectId, ref: 'Refer' }],
  },
  { discriminatorKey: 'role' }
);

investorSchema.index({ name: 'text', email: 'text' });

investorSchema.statics = {
  searchPartial: async function (q, limit, skipIndex) {
    return await this.find({
      $or: [{ name: new RegExp(q, 'gi') }, { email: new RegExp(q, 'gi') }],
    })
      .limit(limit)
      .skip(skipIndex)
      .exec();
  },

  searchPartialCount: async function (q, limit, skipIndex) {
    return await this.find({
      $or: [{ name: new RegExp(q, 'gi') }, { email: new RegExp(q, 'gi') }],
    }).countDocuments();
  },

  searchFull: async function (q) {
    return await this.find({
      $text: { $search: q, $caseSensitive: false },
    });
  },

  search: async function (q) {
    try {
      const result = await this.searchFull(q);
      console.log(result);
      if (!result.length) {
        return await this.searchPartial(q);
      }
      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

const Investor = User.discriminator('Investor', investorSchema);
export default Investor;

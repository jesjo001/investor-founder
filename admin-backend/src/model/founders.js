import mongoose from 'mongoose';
import {
  INDUSTRY_TYPE,
  STAGE,
  TICKET_SIZE,
  PLAN_TYPE,
} from '../utils/constants.js';
const { ObjectId } = mongoose.Schema.Types;
import User from './user.js';

const founderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    expertise: {
      type: String,
      maxLength: 1024,
    },
    industryType: {
      type: String,
      enum: INDUSTRY_TYPE,
    },
    established: Date,
    haveCofounders: {
      type: Boolean,
      enum: [true, false],
    },
    startupCountry: {
      type: String,
    },
    startupName: {
      type: String,
    },
    officeAddress: {
      type: String,
    },
    cofounder: String,
    coolInfo: {
      type: String,
      maxLength: 1024,
    },
    stage: {
      type: String,
      enum: ['Idea', 'MVP/Seed', 'Product market fit', 'Scaling'],
    },
    ticketRaised: {
      type: String,
      enum: TICKET_SIZE,
    },
    ticketToRaise: {
      type: String,
      enum: TICKET_SIZE,
    },
    investor: String,
    deckLink: String,
    website: String,
    companyEmail: String,
    profileImage: String,
    problemStatement: String,
    companySolution: String,
    whyOurCompany: String,
    myCompetitors: String,
    burnRate: String,
    madeProfit: String,
    fundAllocation: String,
    milestones: String,
    logo: String,
    num0fCoFounders: {
      type: Number,
      default: 0,
    },
    // chat app plan
    plan: {
      type: String,
      enum: PLAN_TYPE,
      default: null,
    },
    // date of plan purchased
    planDate: {
      type: Date,
    },
    approvedBy: {
      type: String,
    },
    planExpiry: {
      type: Date,
    },
    // the founder/investor who referred this founder
    referredBy: {
      type: ObjectId,
      ref: 'User',
    },
    // whether a founder referred or an investor referred
    refererType: {
      type: String,
      required: true,
      enum: ['Investor', 'Founder'],
    },
    // the founder this founder gave referal to
    referred: [{ type: ObjectId, ref: 'Refer' }],
  },
  { discriminatorKey: 'role' }
);

founderSchema.index({ name: 'text', email: 'text' });

founderSchema.statics = {
  searchPartial: async function (q, limit, skipIndex) {
    return await this.find({
      isApproved: true,
      $or: [{ name: new RegExp(q, 'gi') }, { email: new RegExp(q, 'gi') }],
    })
      .limit(limit)
      .skip(skipIndex)
      .exec();
  },

  searchPartialUnapproved: async function (q, limit, skipIndex) {
    return await this.find({
      isApproved: false,
      $or: [{ name: RegExp(q, 'gi') }, { email: new RegExp(q, 'gi') }],
    })
      .limit(limit)
      .skip(skipIndex)
      .exec();
  },

  searchPartialUnapprovedCount: async function (q, limit, skipIndex) {
    return await this.find({
      isApproved: false,
      $or: [{ name: new RegExp(q, 'gi') }, { email: new RegExp(q, 'gi') }],
    }).countDocuments();
  },


  searchPartialCount: async function (q, limit, skipIndex) {
    return await this.find({
      isApproved: true,
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

const Founder = User.discriminator('Founder', founderSchema);
export default Founder;

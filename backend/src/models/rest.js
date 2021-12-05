import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const referSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    referredBy: {
      type: ObjectId,
      refPath: 'refererType',
    },
    refererType: {
      type: String,
      required: true,
      enum: ['Investor', 'Founder'],
    },
    status: {
      type: String,
      required: true,
      enum: ['invited', 'registered'],
    },
  },
  { timestamps: true }
);

export const Refer = mongoose.model('Refer', referSchema);

import mongoose from 'mongoose';

const paymentPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    unit: { 
        type: String,
        required: true
    },
    duration: { 
        type: Number,
        required: true
    },
    package: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const PaymentPlan = mongoose.model('PaymentPlan', paymentPlanSchema);
export default PaymentPlan;

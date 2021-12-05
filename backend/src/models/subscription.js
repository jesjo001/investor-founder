import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User' 
    },
    planId: {
      type: mongoose.Schema.ObjectId,
      ref: 'PaymentPlan' 
    },
    startDate: {
      type: Date,
      default: new Date()
    },
    endDate: {
      type: Date,
      default: new Date()
    },
  },
  { timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
   }
);

subscriptionSchema.methods.getSubscriptionStatus = function() { 
  return this.endDate > Date.now()
};


const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;

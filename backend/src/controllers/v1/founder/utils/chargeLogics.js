import Founder from '../../../../models/founder';

// set monthly shipping plans to  the database
export const monthly = async id =>
  await Founder.findByIdAndUpdate(id, {
    $set: {
      plan: 'Monthly',
      planDate: new Date().toLocaleDateString(),
    },
  }).exec();

// set quarterly shipping plans to  the database
export const quarterly = async id =>
  await Founder.findByIdAndUpdate(id, {
    $set: {
      plan: 'Quarterly',
      planDate: new Date().toLocaleDateString(),
    },
  }).exec();

// set annually shipping plans to  the database
export const annually = async id =>
  await Founder.findByIdAndUpdate(id, {
    $set: {
      plan: 'Annually',
      planDate: new Date().toLocaleDateString(),
    },
  }).exec();

import User from '../../../models/user';

export const getFounder = async (req, res) => {
  try {
    const data = await User.find({
      role: 'Founder',
    })
      .select('-password')
      .lean()
      .exec();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).end('Something went wrong please try later.');
  }
};

export const getFounderPlan = async (req, res) => {
  try {
    const data = await User.findOne({
      _id: req.user.id,
      role: 'Founder',
    })
      .select('plan planType planDate planExpiry')
      .lean()
      .exec();

    if (!data.plan || data.planExpiry < new Date())
      return res
        .status(200)
        .json({ active: false, message: 'No active subscription' });
    return res.status(200).json({ ...data, active: true });
  } catch (e) {
    return res.status(500).end('Something went wrong please try later.');
  }
};

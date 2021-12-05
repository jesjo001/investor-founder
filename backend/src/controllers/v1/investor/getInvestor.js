import User from '../../../models/user';
export const getInvestor = async (req, res) => {
  try {
    const data = await User.find({
      role: 'Investor',
    })
    .select('-password')
    .lean()
    .exec();
    res.send(data);
  } catch (e) {
    return res.status(500).end();
  }
};

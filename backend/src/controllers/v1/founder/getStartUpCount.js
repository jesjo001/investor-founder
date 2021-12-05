import User from '../../../models/user';

export const getStartUpCount = async (req, res) => {
  // get founders count
  try {
    const data = await User.find({
      role: 'Founder',
    })
      .countDocuments()
      .exec();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).end();
  }
};

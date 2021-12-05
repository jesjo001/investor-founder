import User from '../../../models/user';

export const info = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
      .select('-password -_id -__v -createdAt -updatedAt')
      .lean()
      .exec();   

    return res.status(200).send(user);
  } catch (e) {
    // console.error(e);
    return res.status(500).end();
  }
};

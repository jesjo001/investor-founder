import User from '../../../models/user';

const { forgotPasswordEmail } = require('../../../utils/forgotPasswordEmail');
const crypto = require('crypto');

export const forgotPassword = async (req, res, next) => {
  try {
    //getting email of the user
    const { email } = req.body;

    //checking if email exist in the database
    const user = await User.findOne({ email });

    //  things to do if the user does not exist
    if (!user)
      return res
        .status(404)
        .json({ message: 'Email does not exist.', status: false });

    //   generate a random token for the client
    const generatedToken = crypto.randomBytes(32);

    //   check for error
    if (!generatedToken) {
      return res.status(500).json({
        message: 'An error occured. Please try again later.',
        status: false,
      });
    }

    //   converting the token to a hexstring
    const convertTokenToHexString = generatedToken.toString('hex');
    //  set the token and expiring period for the token to the user schema
    const updateUser = {};

    updateUser.resetToken = convertTokenToHexString;
    updateUser.expireToken = Date.now() + 5400000;

    const saveToken = await User.findOneAndUpdate(
      { _id: user._id },
      { ...updateUser },
      { new: true }
    );

    if (!saveToken) {
      return res.status(500).json({
        status: false,
        message: 'An error occured while trying to save the token',
      });
    }

    console.log(`{saveToken.email}`, saveToken.email, saveToken.resetToken);
    forgotPasswordEmail({
      req,
      res,
      userEmail: saveToken.email,
      resetToken: saveToken.resetToken,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default forgotPassword;

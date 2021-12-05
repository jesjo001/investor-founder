import User from '../../../models/user';
import { sendMail } from '../../../utils/mail';
import bcrypt from 'bcryptjs';
import { emailTemplates } from '../../../utils/email-templates/emails';

export const resetPassword = async (req, res, next) => {
  try {
    //destructure the req body
    const { email, password, resetToken } = req.body;

    //checking if email exist
    const emailExistAndHasNotExpired = await User.findOne({
      email: email,
      resetToken,
      expireToken: { $gt: Date.now() + 3600000 },
    });

    if (!emailExistAndHasNotExpired) {
      return res.status(404).json({
        message: 'No match was found! or the reset link has expired',
        status: false,
      });
    }

    //assigning the salt to use
    const saltR = 10;

    // generate salt
    const generateSalt = await bcrypt.genSalt(saltR);

    // check for salt
    if (!generateSalt)
      return res.status(400).send({ message: 'Failed to generate salt' });

    //hashing the password
    const hashPassword = await bcrypt.hash(password, generateSalt);

    // check for error
    if (!hashPassword)
      return res
        .status(400)
        .json({ message: 'Error occurred while hashing the password.' });

    // save the hash password
    await User.updateOne(
      {
        //creating an update to client password
        email: email,
      },
      { $set: { password: hashPassword } }
    );

    const templateId = emailTemplates.DYNAMIC_TEMPLATE;
    const dynamicTemplateData =  {
      dynamicBody: 'You have successfully reset your password. Kindly head to the signin page to sign in.',
    }
    // send mail to the user
    await sendMail(
      email,
      'Reset Password',
      templateId,
      dynamicTemplateData
    );

    // send success message to the user
    return res.status(200).json({
      message: 'You have successfully reset you password',
      status: true,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
// export default resetPassword;

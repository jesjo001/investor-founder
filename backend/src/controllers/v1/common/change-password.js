import bcrypt from 'bcryptjs';
import { Notification } from '../../../models/notification';
import User from '../../../models/user';
import { sendMail } from '../../../utils/mail';
import { emailTemplates } from '../../../utils/email-templates/emails';

export const changePassword = async (req, res) => {
  try {
    const { oldpassword, newpassword, confirmpassword } = req.body;

    if (!req.body.oldpassword || !req.body.newpassword) {
      return res.send({ error: 'No empty input', success: false });
    }

    if (newpassword !== confirmpassword) {
      return res.send({ error: 'Password not match', success: false });
    }

    //check if old password matchh database password
    // check for password
    const user = await User.findOne({ email: req.user.email }).exec();
    const match = await user.checkPassword(oldpassword);
    if (!match) {
      return res.send({ error: 'Old password not correct', success: false });
    }

    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(newpassword, salt);

    //Upate password for user
    const UpdatePassword = await User.updateOne(
      { email: req.user.email },
      { $set: { password: hash } }
    ).exec();
    if (UpdatePassword) {
      //prepare mail TO USER AND SEND NOTIFICATION
      
      const subject = `Password reset via muonclub`;
      const text = `${user.name} we're verifying a password reset that was recently made on your muonclub account`;
      const templateId = emailTemplates.DYNAMIC_TEMPLATE;
      const dynamicTemplateData =  {
        dynamicBody: `${user.name} we're verifying a password reset that was recently made on your muonclub account`,
      }
      //check if a notification with same details exist in the database if yes no need to insert

      const createForP_R = await new Notification({
        sender: {
          fullName: user.name,
          id: req.user.id,
          role: req.user.role,
        },
        receiverId: req.user.id,
        blogLink: '',
        message: `${user.name} we just verified a sucessfull password reset on this account!`,
        type: 'PASSWORD_RESET',
        mailed: true,
        view: 0,
      });
      const saveForP_R = await createForP_R.save();
      if (saveForP_R) {
        sendMail(req.user.email, subject, templateId, dynamicTemplateData);
        return res
          .status(200)
          .send({ message: 'password update successfully', success: true });
      }
      return res.status(500).send({ error: 'Server error' });
    }
  } catch (error) {
    console.log(error.message);
  }
};

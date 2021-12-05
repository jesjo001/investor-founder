import nodemailer from 'nodemailer';
import { sendMail } from '../utils/mail';
import { emailTemplates } from '../utils/email-templates/emails';

const templateId = emailTemplates.FORGOT_PASSWORD;

export const forgotPasswordEmail = ({ req, res, userEmail, resetToken }) => {
  // adding mail auths
  // const transporter = nodemailer.createTransport({
  //   port: 465, // true for 465, false for other ports
  //   host: 'smtp.gmail.com',
  //   service: 'gmail',
  //   auth: {
  //     user: `${process.env.EMAIL}`,
  //     pass: `${process.env.PASSWORD}`,
  //   },
  //   secure: true,
  // });

  // //   sending a reset link to the user email
  // transporter.sendMail(
  //   {
  //     from: `${process.env.Email}`, // sender address
  //     to: `${userEmail}`, // list of receivers
  //     subject: 'Forgot Password', // Subject line
  //     // text: `Kindly click ${process.env.FRONTEND_URL_DEV}/reset-password/${userEmail}/${resetToken} Click Here to reset your password, // plain text body`,
  //     html: `<p>
  //   Kindly click <a href="${
  //     process.env.NODE_ENV === 'development'
  //       ? process.env.FRONTEND_URL_DEV
  //       : process.env.FRONTEND_URL_PROD
  //   }/reset-password/${userEmail}/${resetToken}">Click Here</a> to reset your password
  //   </p>
  //     `, // html body
  //   },
  //   err => {
  //     // watch for error
  //     if (err)
  //       return res.status(500).json({
  //         message:
  //           "server error, 'missing credentials for plain' please try again later",
  //         status: false,
  //       });

  //     // send a success message to the client

  //     return res.status(200).json({
  //       message: 'A reset password link has been sent to your email',
  //       status: true,
  //     });
  //   }
  // );

  const resetPasswordUrl = `${
    process.env.NODE_ENV === 'development'
      ? process.env.FRONTEND_URL_DEV
      : process.env.FRONTEND_URL_PROD
  }/reset-password/${userEmail}/${resetToken}`

  const dynamicTemplateData = {
    receiverName: '',
    resetPasswordUrl,
  };

  sendMail(userEmail, 'Forgot Password', templateId, dynamicTemplateData);

  //   option for sendGrid

  // create a mail medium
  //   sgMail.setApiKey(process.env.SENDGRID_API);

  // setting mail options
  //   const msg = {
  //     to: userEmail, // Change to your recipient
  //     from: process.env.SENDGRID_FROM, // Change to your verified sender
  //     subject: 'DT Admin Password Reset',
  //     text: `You requested for password reset. Kindly click ${req.headers.origin}/signup?email=${userEmail}&resettoken=${resetToken}`,
  //     html: `<h5>You requested for password reset. </h5>
  //     <p>
  //     Kindly click <a href="${req.headers.origin}/signup?email=${userEmail}&resettoken=${resetToken}">Click Here</a> to reset your password
  //     </p>
  //       `,
  //   };

  // send mail
  //   sgMail
  //     .send(msg)
  //     .then(() => {
  //       return res.status(200).json({
  //         status: true,
  //       });
  //     })
  //     .catch(error => {
  //       console.log('EMAIL ERROR: ', JSON.stringify(error));
  //       return res.status(500).json({
  //         status: false,
  //         message: 'An error occured. Please try again later.',
  //       });
  //     });
};

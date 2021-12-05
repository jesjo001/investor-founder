import { sendMail } from '../../../../utils/mail';
import { emailTemplates } from '../../../../utils/email-templates/emails';

const templateId = emailTemplates.REFERRAL_COMPLETION;

export const mailData = (referralEmail, receiverEmail, referralName, type) => {
  const completeProfileUrl = `${
    process.env.NODE_ENV === 'development'
      ? process.env.FRONTEND_URL_DEV
      : process.env.FRONTEND_URL_PROD
  }/${type}/becomeMember?referredBy=${referralEmail}&id=${receiverEmail}}`;
  const dynamicTemplateData = {
    referrerName: referralName,
    completeProfileUrl,
  };
  // const html = `<a href="${
  //   process.env.NODE_ENV === 'development'
  //     ? process.env.FRONTEND_URL_DEV
  //     : process.env.FRONTEND_URL_PROD
  // }/${type}/becomeMember?referredBy=${referralEmail}&id=${receiverEmail}">Click Here to Join</a>`;
  const subject = `An Invitation to join Muon from ${referralName}.`;
  sendMail(receiverEmail, subject, templateId, dynamicTemplateData);
  return console.log('mail sent');
};

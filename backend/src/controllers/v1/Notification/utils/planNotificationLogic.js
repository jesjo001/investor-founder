import Founder from '../../../../models/founder';
import { sendMail } from '../../../../utils/mail';
import { emailTemplates } from '../../../../utils/email-templates/emails';
import cronJob from 'node-cron';

export const monthlyPlanNotification = async ({ planType, loginUserId }) => {
  // verify if login user is a founder
  const isFounder = await Founder.findOne(
    {
      _id: loginUserId,
      role: 'Founder',
      plan: planType,
      planDate: { $eq: new Date(2592000000) - new Date(172800000) },
    },
    ['email', 'name']
  );
  //   return false if the founder was not found
  if (!isFounder) return false;

  const templateId = emailTemplates.DYNAMIC_TEMPLATE;
  const dynamicTemplateData = {
    dynamicBody: `Hi ${isFounder.name}, Your ${planType} Plan will expire in less than 48 hours; click the following to signin to your <a href=${process.env.FRONTEND_URL_DEV}/founder/>dashboard</a> to enroll in a new plan. `,
  };
  // send notification to active founder
  try {
    sendMail(
      isFounder.email,
      'Plan Notification',
      templateId,
      dynamicTemplateData
    );
  } catch (error) {
    console.error(error);
  }
};

export const quarterlyPlanNotification = async ({ planType, loginUserId }) => {
  // verify if login user is a founder
  const isFounder = await Founder.findOne(
    {
      _id: loginUserId,
      role: 'Founder',
      plan: planType,
      planDate: { $eq: new Date(2592000000) - new Date(172800000) },
    },
    ['email', 'name']
  );
  //   return false if the founder was not found
  if (!isFounder) return false;

  const templateId = emailTemplates.DYNAMIC_TEMPLATE;
  const dynamicTemplateData = {
    dynamicBody: `Hi ${isFounder.name}, Your ${planType} Plan will expire in less than 48 hours; click the following to signin to your <a href="${process.env.FRONTEND_URL_DEV}/pricing" />pricing</a> to enroll in a new plan. `
  };
  // send notification to active founder
  try {
    sendMail(
      isFounder.email,
      'Plan Notification',
      templateId,
      dynamicTemplateData
    );
  } catch (error) {
    console.error(error);
  }
};

export const annuallyPlanNotification = async ({ planType, loginUserId }) => {
  // verify if login user is a founder
  const isFounder = await Founder.findOne(
    {
      _id: loginUserId,
      role: 'Founder',
      plan: planType,
      planDate: { $eq: new Date(31536000000) - new Date(2592000000) },
    },
    ['email', 'name']
  );

  //   return false if the founder was not found
  if (!isFounder) return false;
  const templateId = emailTemplates.DYNAMIC_TEMPLATE;
  const dynamicTemplateData = {
    dynamicBody: `Hi ${isFounder.name}, Your ${planType} Plan will expire in less than 48 hours; click the following to signin to your <a href="${process.env.FRONTEND_URL_DEV}/pricing" />pricing</a> to enroll in a new plan. `
  };
  // send notification to active founder
  try {
    sendMail(
      isFounder.email,
      'Plan Notification',
      templateId,
      dynamicTemplateData
    );
  } catch (error) {
    console.error(error);
  }
};

export const haveNoPlanYet = async ({ planType, loginUserId }) => {
  // verify if login user is a founder and has not plan
  const isFounder = await Founder.findOne(
    {
      _id: loginUserId,
      role: 'Founder',
      plan: planType,
    },
    ['email', 'name']
  );

  // check if client is a founder
  if (!isFounder) return false;

  const templateId = emailTemplates.DYNAMIC_TEMPLATE;
  const dynamicTemplateData = {
    dynamicBody: `Hi ${isFounder.name},We at muon notice you have not subscribed to any of our plan. click the following to signin to your <a href='${process.env.FRONTEND_URL_DEV}/pricing' />pricing</a> to enroll in a new plan to have more flexibility on our services to you. Thank you`
  };

  //  schedule a cron job every 8:03 am daily and send a message to the null plan users
  cronJob.schedule('3 8 * * *', () => {
    console.log('running a task every day at 8:03 am');
    try {
      sendMail(
        isFounder.email,
        'Plan Notification',
        templateId,
        dynamicTemplateData
      );
    } catch (error) {
      console.error('error from here');
    }
  });
};

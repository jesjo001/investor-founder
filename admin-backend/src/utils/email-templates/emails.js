export const emailTemplates = Object.freeze({
    // Thie template is for emails that are sent after the person that was referred completes signup
    // Dynamic data includes: receiverName, receiverEmail, subject: 'Referral acceptance', dynamicTemplateDate: {
      // referrerName: 'Name of the person that referred the user',
      //receiverName: receiverName,
      // completeProfileUrl: process.env.FRONTEND_URL_PROD
    // }
    REFERRAL_COMPLETION: 'd-d1084cfa55564718a27ca6c02f13a892',
     // Thie template is for emails that are sent to investors
    // Dynamic data includes: receiverName, receiverEmail, subject: 'Referral acceptance', dynamicTemplateDate: {
      //receiverName: receiverName,
      // joinUrl: process.env.FRONTEND_URL_PROD
    // }
    INVESTOR_EMAIL: 'd-6920e00e3743438980763d97f6f3a1b5',
     // Thie template is for emails that are sent to founders
    // Dynamic data includes: receiverName, receiverEmail, subject: 'Referral acceptance', dynamicTemplateDate: {
      //receiverName: receiverName,
      // joinUrl: process.env.FRONTEND_URL_PROD
    // }
    FOUNDER_EMAIL: 'd-1b378f71126c4a7bba76b419e5432486',
    // Thie template is for emails that are sent to founders approved via admin
  // Dynamic data includes: subject, password, passwordResetUrl, subject: 'Welcome To Moun Club', dynamicTemplateDate: {
    //subject: receiverName,
    //password: 'users password'
    // passwordResetUrl: process.env.FRONTEND_URL_PROD
  // }
  FOUNDER_APPROVAL_EMAIL: 'd-f3d35af5657947529ba4ae3687a77f89',
    // This email is sent for reset password
  // Dynamic data includes: receiverName, receiverEmail, subject: 'Referral acceptance', dynamicTemplateDate: {
      //receiverName: receiverName,
      // resetPasswordUrl: Generated on the forgot password
    // }
    FORGOT_PASSWORD: 'd-904f6ed497f64d4eafc3183fd4ebcdb5',
  
    // This email is used generically
  // Dynamic data includes: receiverName, receiverEmail, subject: 'Referral acceptance', dynamicTemplateDate: {
      // dynamicBody: e.g 'A login attempt was made on this muonclub account'
    // }
    DYNAMIC_TEMPLATE: 'd-b4a270f220e64f03bcfa3a263190ee4c'
  })
import sgMail from "@sendgrid/mail";
require("dotenv").config();

const sgMailApiKey = process.env.SENDGRID_SECRET_KEY;

sgMail.setApiKey(sgMailApiKey);

export const sendMail = (to, subject, templateId, dynamic_template_data) => {
  dynamic_template_data.subject = subject;
  const msg = {
    to,
    from: { name: "Muon CLub", email: process.env.REPLY_TO_EMAIL },
    templateId,
    dynamic_template_data,
  };
  console.log(msg);
  console.log(sgMailApiKey);
  sgMail
    .send(msg)
    .then((response) => {
      console.log("mail-sent-successfully", {
        templateId,
        dynamic_template_data,
      });
      console.log("response", response);
      /* assume success */
    })
    .catch((error) => {
      /* log friendly error */
      console.error("send-grid-error: ", error.toString());
    });
};

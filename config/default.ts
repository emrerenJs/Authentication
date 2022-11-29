export default {
  /* APP LEVEL */
  port: 3000,
  dbUri: "mongodb://localhost:27017/authentication_db",
  /* APP LEVEL */

  /* CROSS CUTTING CONCERNS */
  logLevel: "info",
  /* CROSS CUTTING CONCERNS */

  /* E-MAIL SENDING */
  smtp: {
    user: "shx54uacx2p4mdm5@ethereal.email",
    pass: "KgM8jxEXZ1q4TuQDte",
    host: "smtp.etheral.email",
    port: 587,
    secure: false,
  },
  /* E-MAIL SENDING */
};

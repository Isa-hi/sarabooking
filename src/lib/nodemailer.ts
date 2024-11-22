import nodemailer from "nodemailer";
// Looking to send emails in production? Check out our Email API/SMTP product!
export const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "64824d9e37af6d",
    pass: "30cf333f9e1c52",
  },
});
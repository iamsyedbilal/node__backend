import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1) create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS,
    },
    // Active in gmail "less secure app" option
    // Gmail only allow 500 emails and after that add the mails in spam
  });
  // 2) define the email options
  const mailOptions = {
    from: 'Syed Bilal <syedbilal.dev27@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  // 3) send the email with nodemailer
  await transporter.sendMail(mailOptions);
};

export default sendEmail;

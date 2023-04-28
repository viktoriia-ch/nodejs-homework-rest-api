const nodemailer = require("nodemailer");
require("dotenv").config();

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.PASSWORD_META,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  try {
    const email = {
      ...data,
      from: process.env.EMAIL_FROM,
    };

    await transport.sendMail(email);
    return true;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = sendEmail;

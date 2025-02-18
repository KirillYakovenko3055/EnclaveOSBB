const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'enclaveosbb@gmail.com',
    pass: `${process.env.EMAIL_CODE}`
  }
});

const sendAuthCode = async (email, authCode) => {
  try {
    await transporter.sendMail({
      from: 'enclaveosbb@gmail.com',
      to: email,
      subject: 'Код аутентифікації',
      text: `Код: ${authCode}. Валідний 5 хвилин.`
    });
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
  }
};

const sendAuthCode2 = async (email, authCode) => {
  try {
    await transporter.sendMail({
      from: 'enclaveosbb@gmail.com',
      to: email,
      subject: "Код прив'язки особового рахунку",
      text: `Код: ${authCode}.`
    });
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
  }
};

const sendEmail = async (email, text) => {
  try {
    await transporter.sendMail({
      from: 'enclaveosbb@gmail.com',
      to: 'enclaveosbb@gmail.com',
      subject: `Message from ${email}`,
      text: text
    });
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
  }
};

function generateAuthCode() {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
}
  
module.exports = { sendAuthCode, sendAuthCode2, generateAuthCode, sendEmail};
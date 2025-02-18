const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDB } = require('../config/db');
require('dotenv').config();
const { db } = require('../config/firebaseConfig.js');
const { ObjectId } = require('mongodb');
const { sendAuthCode, generateAuthCode } = require('../config/emailConfig');

exports.telegramLogin = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
  }

  const db2 = getDB();
  const usersCollection = db2.collection('users');

  const user = await usersCollection.findOne({ login });
  if (!user) {
    return res.status(400).json({ message: 'Неверные учетные данные' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Неверные учетные данные' });
  }

  const authCode = generateAuthCode();
  const email = user.email;

  const docRef = await db.collection('authCodes').add({
    email: email,
    code: authCode,
    timestamp: new Date(),
  });

  sendAuthCode(email, authCode);

  res.json({ message: 'Код авторизации отправлен на email', email });
};

exports.verifyCode = async (req, res) => {
  const { code, chatId } = req.body;

  if (!code || !chatId) {
    return res.status(400).json({ message: 'Требуется код и chatId' });
  }

  try {
    const authCodesCollection = db.collection('authCodes');

    const authCodeQuery = await authCodesCollection.where('code', '==', code).get();

    if (authCodeQuery.empty) {
      return res.status(400).json({ message: 'Неверный или истекший код' });
    }

    const authCodeDoc = authCodeQuery.docs[0];
    const email = authCodeDoc.data().email.toLowerCase();

    const db2 = getDB();
    const usersCollection = db2.collection('users');

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const userRole = user.role;

    await usersCollection.updateOne(
      { email },
      { $set: { chatId } }
    );

    const token = jwt.sign({ email, role: userRole }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await authCodesCollection.doc(authCodeDoc.id).delete();

    return res.json({ token, message: 'Код подтвержден, chatId обновлен' });

  } catch (error) {
    console.error('Ошибка при верификации кода:', error);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};


exports.getAccounts = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).json({ message: 'Chat ID is required' });
  }

  try {
    const db2 = getDB();
    const usersCollection = db2.collection('users');

    const user = await usersCollection.findOne({ chatId: parseInt(chatId) });
    const userToPersonalAccountsCollection = db2.collection('userstopersonalaccounts');
    const personalAccountsCollection = db2.collection('personalaccounts');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userToAccounts = await userToPersonalAccountsCollection.find({ userId: user._id }).toArray();
    const personalAccountIds = userToAccounts.map(entry => entry.personalAccountId);
    const accounts = await personalAccountsCollection.find({ _id: { $in: personalAccountIds } }).toArray();

    res.json(accounts);

  } catch (error) {
    console.error('Error fetching accounts by chatId:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getMeasurers = async (req, res) => {
  const { accountId } = req.params;
  try {
    const db2 = getDB();

    const measurersToPersonalAccountsCollection = db2.collection('measurerstopersonalaccounts');
    const measurersCollection = db2.collection('measurers');

    const measurersToAccounts = await measurersToPersonalAccountsCollection.find({ personalAccountId: new ObjectId(accountId) }).toArray();
    const measurerIds = measurersToAccounts.map(entry => entry.measurerId);
    const measurers = await measurersCollection.find({ _id: { $in: measurerIds } }).toArray();
    const result = measurersToAccounts.map(measurerToAccount => {
        const measurer = measurers.find(m => m._id.equals(measurerToAccount.measurerId));
        return {
            ...measurer, 
            vendorCode: measurerToAccount.vendorCode, 
            startDate: measurerToAccount.startDate,
            endDate: measurerToAccount.endDate 
        };
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка получения счетчиков' });
  }
};

exports.getMeasurerRecords = async (req, res) => {
  const { measurerId } = req.params;

  try {
    const db2 = getDB();
    const measurerToAccount = await db2.collection("measurerstopersonalaccounts").findOne({ measurerId: new ObjectId(measurerId) });

    if (!measurerToAccount) {
      return res.status(404).json({ message: 'Связь для данного счетчика не найдена.' });
    }
    const records = await db2.collection("measurerrecords").find({ measurerToPersonalAccountId: measurerToAccount._id }).toArray();

    if (records.length === 0) {
      return res.status(404).json({ message: 'Записи не найдены для данного счетчика.' });
    }
    res.json(records);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка получения записей счетчика' });
  }
};

exports.getActiveServices = async (req, res) => {
  const { accountId } = req.params;
  const currentDate = new Date();

  try {
    const db2 = getDB();

    const activeServices = await db2.collection('servicestopersonalaccounts').aggregate([
      {
        $match: {
          personalAccountId: new ObjectId(accountId),
          startDate: { $lte: currentDate },
          $or: [
            { endDate: { $gte: currentDate } },
            { endDate: null }
          ]
        }
      },
      {
        $lookup: {
          from: 'typeservices',
          localField: 'typeServiceId',
          foreignField: '_id',
          as: 'serviceDetails'
        }
      },
      {
        $unwind: '$serviceDetails'
      }
    ]).toArray();

    res.json(activeServices);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка получения активных услуг' });
  }
};
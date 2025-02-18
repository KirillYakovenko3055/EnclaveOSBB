const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const { connectFirebase } = require('../config/firebaseConfig.js');
require('dotenv').config();
const { getDB, connectDB } = require('../config/db');
const { sendAuthCode, generateAuthCode } = require('../config/emailConfig');
// const { ObjectId } = require('mongodb');

exports.register = async (req, res) => {
  const {
    login,
    email,
    password,
    phone,
    role,
    firstname,
    lastname,
    middlename,
    taxcode,
    gender,
    birthday,
  } = req.body;

  try {
    const db2 = await connectDB();


    const usersCollection = db2.collection("users");
    const personsCollection = db2.collection("persons");

    const existingUser = await usersCollection.findOne({ $or: [{ login }, { email }] });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User with this login or email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      login,
      email,
      password: hashedPassword,
      phone,
      role,
      status: "active", 
      registration_date: new Date(),
    };

    const userResult = await usersCollection.insertOne(newUser);

    const newPerson = {
      firstname,
      middlename,
      lastname,
      email,
      phone,
      taxcode,
      gender,
      birthday: new Date(birthday),
    };

    const personResult = await personsCollection.insertOne(newPerson);

    if (userResult.insertedId && personResult.insertedId) {
      return res.status(201).json({ success: true, message: "User and Person registered successfully." });
    } else {
      throw new Error("Failed to register user or person.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user: ' + error + " " + process.env.MONGO_URI });
  }
};
exports.register2 = async (req, res) => {
const{message}=req.body;
res.json({ 
  message:message
}) 
};

exports.login = async (req, res) => {
    try{
      const { login, password } = req.body;

      if (!login || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const db = await connectFirebase();
      const db2 = await connectDB();
      const usersCollection = db2.collection('users');

      const user = await usersCollection.findOne({ login });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const authCode = generateAuthCode();
      const email = user.email;

      await db.collection('authCodes').add({
        email,
        code: authCode,
        timestamp: new Date()
      });

      sendAuthCode(email, authCode);
      res.json({ message: 'Код отправлен на почту', email });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error login: ' + error });
}

};

// exports.verifyCode = async (req, res) => {
//   const { code, login } = req.body;

//   if (!code) {
//     return res.status(400).json({ message: 'Код обязателен' });
//   }

//   try {
//     const authCodesCollection = db.collection('authCodes');

//     const authCodeQuery = await authCodesCollection
//       .where('code', '==', code)
//       .get();

//     if (authCodeQuery.empty) {
//       return res.status(400).json({ message: 'Неверный или просроченный код' });
//     }

//     const db2 = getDB();
//     const usersCollection = db2.collection('users');
//     const usersToAccountsCollection = db2 .collection('userstopersonalaccounts');
//     const personalaccountsCollection = db2 .collection('personalaccounts');

//     const authCodeDoc = authCodeQuery.docs[0];
//     const email = authCodeDoc.data().email;

//     const user = await usersCollection.findOne({login: login, email: email});
//     const userstoaccount = await usersToAccountsCollection.find({userId: new ObjectId(user._id)}).toArray();
//     const personalAccountIds = await userstoaccount.map(entry => entry.personalAccountId);
//     const accounts = await personalaccountsCollection.find({ _id: { $in: personalAccountIds } }).toArray();

//     const userRole = user.role;
//     const token = jwt.sign({ email, role: userRole, accounts: accounts }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
//     await authCodesCollection.doc(authCodeQuery.docs[0].id).delete();

//     return res.json({ token, role: user.role, accounts: accounts });
//   } catch (error) {
//     console.error('Ошибка при проверке кода:', error);
//     res.status(500).json({ message: 'Внутренняя ошибка сервера' });
//   }
// };

// exports.checkToken = (req, res) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ valid: false });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return res.json({ valid: true, role: decoded.role });
//   } catch (error) {
//     return res.status(401).json({ valid: false });
//   }
// };
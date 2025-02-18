const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

exports.getAccounts = async (req, res) => {
  const { login } = req.params;
  const { email } = req.params;
  try {
    const db2 = getDB();

    const usersCollection = db2.collection('users');
    const userToPersonalAccountsCollection = db2.collection('userstopersonalaccounts');
    const personalAccountsCollection = db2.collection('personalaccounts');
    const personslCollection = db2.collection('persons');
    const residentToPersonalAccountsCollection = db2.collection('residentstopersonalaccounts');

    const user = await usersCollection.findOne({ login: login, email: email });
    if (!user) {
      console.log(`Пользователь с логином "${login}" не найден.`);
      return [];
    }

    const userToAccounts = await userToPersonalAccountsCollection.find({ userId: user._id }).toArray();
    const personalAccountIds = userToAccounts.map(entry => entry.personalAccountId);
    const accounts = await personalAccountsCollection.find({ _id: { $in: personalAccountIds } }).toArray();
    if(accounts == 0)
    {
      const person = await personslCollection.findOne({email : user.email});
      const residents = await residentToPersonalAccountsCollection.findOne({personId : new ObjectId(person._id)});
      const accounts = await personalAccountsCollection.find({ _id: new ObjectId(residents.personalAccountId) }).toArray(); 

      return res.json({
        accounts: accounts
      });
    }

    const residentToAccounts = await residentToPersonalAccountsCollection.find({ personalAccountId: { $in: personalAccountIds } }).toArray();
    const personsIds = residentToAccounts.map(entry => entry.personaId);
    const persons = await personslCollection.find({ _id: { $in: personsIds } }).toArray();

    res.json({
      accounts: accounts,
      person: persons
    });
  } catch (error) {
    console.error('Error fetching accounts by accountId:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAccount = async (req, res) => {
  const { accountId, email } = req.params;
  try {
    const db2 = getDB();
    const personalAccountsCollection = db2.collection('personalaccounts');
    const usersCollection = db2.collection('users');
    const account = await personalAccountsCollection.findOne({ _id: new ObjectId(accountId) });


    res.json(account);
  } catch (error) {
    console.error('Error fetching accounts by accountId:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getAccountDetails = async (req, res) => { 
  const { accountId } = req.params;

  
  try {
      const db2 = getDB();
      const personalAccountsCollection = db2.collection('personalaccounts');
      const typeAccountCollection = db2.collection('typepersonalaccounts');
      const buildingsCollection = db2.collection('buildings');
      const cityCollection = db2.collection('cities');
      const streetCollection = db2.collection('streets');

      const account = await personalAccountsCollection.findOne({ _id: new ObjectId(accountId) });
      if (!account) {
          return res.status(404).json({ message: 'Лицевой счет не найден' });
      }

      const building = await buildingsCollection.findOne({ _id: new ObjectId(account.buildingId) }) || null;

      const type = await typeAccountCollection.findOne({ _id: new ObjectId(account.typeId) }) || null;
      
      const city = await cityCollection.findOne({ _id: new ObjectId(building.cityId) }) || null;
      const street = await streetCollection.findOne({ _id: new ObjectId(building.streetId) }) || null;


      res.json({
          accountDetails: account,
          type: type,
          city : city,
          street : street,
          buildingNum : building.buildingNum
      });
  } catch (error) {
      console.error('Error fetching accounts by accountId:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAccountResidentsAndOwners = async (req, res) => {
  const { accountId } = req.params;
  try {
    const db2 = getDB();
    const personalAccountsCollection = db2.collection('personalaccounts');
    const residentsToPersonalAccountCollection = db2.collection('residentstopersonalaccounts');
    const ownersToPersonalAccountCollection = db2.collection('ownerstopersonalaccounts');
    const personsCollection = db2.collection('persons');

    // Найдем лицевой счет
    const account = await personalAccountsCollection.findOne({ _id: new ObjectId(accountId) });
    if (!account) {
      return res.status(404).json({ message: 'Лицевой счет не найден' });
    }

    // Получим владельца
    const ownerLink = await ownersToPersonalAccountCollection.findOne({ personalAccountId: new ObjectId(accountId) });
    let owner = null;
    if (ownerLink) {
      owner = await personsCollection.findOne({ _id: new ObjectId(ownerLink.personId) });
    }

    // Получим жильцов
    /*const residentLinks = await residentsToPersonalAccountCollection.find({ personalAccountId: new ObjectId(accountId), personId: new ObjectId() }).toArray();
    const residents = [];
    
    for (const link of residentLinks) {
      const resident = await personsCollection.findOne({ _id: new ObjectId(link.personId) });
      if (resident) {
        residents.push(resident);
      }
    }*/
    const residentLinks = await residentsToPersonalAccountCollection.find({ personalAccountId: new ObjectId(accountId) }).toArray();

    // Извлеките идентификаторы жильцов
    const residentIds = residentLinks.map(link => link.personId); // Предполагается, что в ссылке есть поле residentId

    // Получите информацию о жильцах
    const residents = await personsCollection.find({ _id: { $in: residentIds.map(id => new ObjectId(id)) } }).toArray();

    // console.log(accountId)
    // console.log(residents)
    // console.log({owner: owner || null,
    //   residents: residents.length > 0 ? residents : null});
    // Возвращаем данные о владельце и жильцах
    res.json({
      owner: owner || null,
      residents: residents.length > 0 ? residents : null
    });
  } catch (error) {
    console.error('Error fetching owner and residents:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
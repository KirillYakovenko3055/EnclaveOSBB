const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');
const { use } = require('../routes/auth');
const { db } = require('../config/firebaseConfig');

exports.getProfile = async (req, res) => {
    const { accountId } = req.params;

    try {
      const db2 = getDB();
      const personalAccountsCollection = db2.collection('personalaccounts');
      const buildingsCollection = db2.collection("buildings");
      const streetsCollection = db2.collection("streets");
      const citiesCollection = db2.collection("cities");
      const personCollection = db2.collection('persons');
      
      console.log(accountId);
      const account = await personalAccountsCollection.findOne({_id: new ObjectId(accountId)});
      const building = await buildingsCollection.findOne({_id: new ObjectId(account.buildingId)});
      const street = await streetsCollection.findOne({_id: new ObjectId(building.streetId)});
      const city = await citiesCollection.findOne({_id: new ObjectId(building.cityId)});
      const person = await personCollection.findOne({_id: new ObjectId(account.personId)});

      res.json({
        person: person,
        account: account,
        street: street,
        city: city,
        flatNum : building.buildingNum
    });

    } catch (error) {
      console.error('Error fetching accounts by accountId:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.updateContact = async (req, res) => {
    const { personId } = req.params;
    const { data } = req.body;

    try {
        const db2 = getDB();
        const personCollection = db2.collection('persons');
        const personalAccountCollection = db2.collection('personalaccounts');

        const person = await personCollection.findOne({ _id: new ObjectId(personId) });
        const personalAccount = await personalAccountCollection.findOne({ personId: new ObjectId(personId) });

        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        if (!personalAccount) {
            return res.status(404).json({ message: 'Personal account not found' });
        }

        let updateField = {};
        if (data.includes('@')) {
            updateField = { email: data };
        } else if (data.startsWith('+')) {
            updateField = { phone: data };
        }
        else if (data.endsWith('м²')) {
            updateField = { totalArea: data.match(/\d+/)[0] };

            await personalAccountCollection.updateOne(
                { personId: new ObjectId(personId) },
                { $set: updateField }
            );
        }
        else if (data.endsWith('personalNumber')) {
            updateField = { personalNumber: data.match(/\d+/)[0] };

            await personalAccountCollection.updateOne(
                { personId: new ObjectId(personId) },
                { $set: updateField }
            );
        }
        else {
            return res.status(400).json({ message: 'Invalid data format' });
        }

        await personCollection.updateOne(
            { _id: new ObjectId(personId) },
            { $set: updateField }
        );

        res.json({ message: 'Contact information updated successfully' });

    } catch (error) {
        console.error('Error updating contact information:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
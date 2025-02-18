const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

exports.getMeasurers = async (req, res) => {
    const { accountId } = req.params;
    try {
      const db2 = getDB();
      const personalAccountsCollection = db2.collection('personalaccounts');
      const measurersToAccountsCollection = db2.collection('measurerstopersonalaccounts');
      const measurersCollection = db2.collection('measurers');
  
      const account = await personalAccountsCollection.findOne({ _id: new ObjectId(accountId) });
      const measurersToAccounts = await measurersToAccountsCollection.find({ personalAccountId: new ObjectId(account._id) }).toArray();
      const measurersToAccountsIds = await measurersToAccounts.map(entry => entry.measurerId);
      const measurers = await measurersCollection.find({ _id: { $in: measurersToAccountsIds } }).toArray();
  
      res.json({
        measurers: measurers
      });
    } catch (error) {
      console.error('Error fetching accounts by accountId:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.getMeasurerDetails = async (req, res) => {
    const { measurerId } = req.params;
    try {
      const db2 = getDB();
      const measurersCollection = db2.collection('measurers');
      const typesCollection = db2.collection('measuretypes');
      const measurersToAccountsCollection = db2.collection('measurerstopersonalaccounts');
      const measurerRecordsCollection = db2.collection('measurerrecords');
  
      const measurersToAccounts = await measurersToAccountsCollection.findOne({ measurerId: new ObjectId(measurerId) });
      const measurer = await measurersCollection.findOne({ _id: new ObjectId(measurerId) });
      const type = await typesCollection.findOne({ _id: measurer.typeId });
      const records = await measurerRecordsCollection.find({ measurerToPersonalAccountId: measurersToAccounts._id }).toArray();
  
      res.json({
        type: type,
        measurer: measurer,
        measurersToAccounts: measurersToAccounts,
        records: records
      });
    } catch (error) {
      console.error('Error fetching accounts by accountId:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.insertDataMeasurer = async (req, res) => {
    const { measurertopersonalaccountId } = req.params;
  
    try {
      const db2 = getDB();
      const measurerRecordsCollection = db2.collection('measurerrecords');
  
      const newRecord = {
        value: req.body.reading,
        date: new Date(req.body.date),
        measurerToPersonalAccountId: new ObjectId(measurertopersonalaccountId)
      };
  
      const result = await measurerRecordsCollection.insertOne(newRecord);
  
      res.status(201).json({
        message: 'Показание успешно добавлено',
        recordId: result.insertedId,
      });
    } catch (error) {
      console.error('Ошибка при добавлении записи:', error);
      res.status(500).json({ message: 'Ошибка при добавлении показания' });
    }
  };
  
  exports.deleteDataMeasurer = async (req, res) => {
    const { recordId } = req.params; 
  
    try {
        const db2 = getDB(); 
        const measurerRecordsCollection = db2.collection('measurerrecords');
  
        const result = await measurerRecordsCollection.deleteOne({ _id: new ObjectId(recordId) });
  
        if (result.deletedCount === 1) {
            res.status(200).json({
                message: 'Запись успешно удалена',
                recordId: recordId
            });
        } else {
            res.status(404).json({ message: 'Запись не найдена' });
        }
    } catch (error) {
        console.error('Ошибка при удалении записи:', error);
        res.status(500).json({ message: 'Ошибка при удалении записи' });
    }
  };
  
  exports.updateDataMeasurer = async (req, res) => {
    const { recordId } = req.params;
  
    try {
      const db2 = getDB();
      const measurerRecordsCollection = db2.collection('measurerrecords');
  
      const updatedRecord = {
        value: req.body.reading,
        date: new Date(req.body.date),
      };
  
      const result = await measurerRecordsCollection.updateOne(
        { _id: new ObjectId(recordId) }, 
        { $set: updatedRecord } 
      );
  
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Запись не найдена или не обновлена' });
      }
  
      res.status(200).json({
        message: 'Показание успешно обновлено',
        recordId: recordId,
      });
    } catch (error) {
      console.error('Ошибка при обновлении записи:', error);
      res.status(500).json({ message: 'Ошибка при обновлении показания' });
    }
  };
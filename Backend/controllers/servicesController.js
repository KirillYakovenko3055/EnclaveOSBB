const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

exports.getServices = async (req, res) => {
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
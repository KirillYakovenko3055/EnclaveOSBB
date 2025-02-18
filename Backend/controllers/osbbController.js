const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');
const crypto = require('crypto');
const { sendEmail } = require('../config/emailConfig');
const { Console } = require('console');


function generateAuthCode() {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
}


exports.getOSBBList = async (req, res) => {
    try {
        const db2 = getDB();

        const osbbCollection = db2.collection('osbborganizations');

        const osbbs = await osbbCollection.find({}).toArray();

        res.json(osbbs);
    } catch (error) {
        console.error('Error fetching accounts by accountId:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.verifyPersonalCode = async (req, res) => {
    const db2 = getDB()
    const { personalCode, login } = req.params;
    const personalAccounts = db2.collection('personalaccounts');
    const residentAccounts = db2.collection('residentstopersonalaccounts');
    const userstopersonalaccountsCollection = db2.collection('userstopersonalaccounts');
    const usersCollection = db2.collection('users');

    try {
        const account = await personalAccounts.findOne({ code: personalCode });
        const user = await usersCollection.findOne({ login: login });



        const newUserToPersonalAccount = {
            userId: user._id,
            personalAccountId: account._id
        };

        await userstopersonalaccountsCollection.insertOne(newUserToPersonalAccount);


        res.status(201).json({ message: 'Квартира успешно привязана' });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getOSBBDetails = async (req, res) => {
    const { OSBBId } = req.params;
    try {
        const db2 = getDB();

        const osbbCollection = db2.collection('osbborganizations');
        const buildingsCollection = db2.collection('buildings');
        const cityCollection = db2.collection('cities');
        const streetCollection = db2.collection('streets');

        const osbb = await osbbCollection.findOne({ buildingId: new ObjectId(OSBBId) });
        const building = await buildingsCollection.findOne({ _id: new ObjectId(osbb.buildingId) });
        const city = await cityCollection.findOne({ _id: building ? new ObjectId(building.cityId) : null });
        const street = await streetCollection.findOne({ _id: building ? new ObjectId(building.streetId) : null });

        res.json({
            ...osbb,
            building,
            city,
            street
        }); exports.getOSBBDetails = async (req, res) => {
            const { OSBBId } = req.params;
            try {
                const db2 = getDB();

                const osbbCollection = db2.collection('osbborganizations');
                const buildingsCollection = db2.collection('buildings');
                const cityCollection = db2.collection('cities');
                const streetCollection = db2.collection('streets');

                // Находим OSBB по ID
                const osbb = await osbbCollection.findOne({ buildingId: new ObjectId(OSBBId) });
                if (!osbb) {
                    return res.status(404).json({ message: 'OSBB not found' });
                }

                // Находим здание по buildingId из OSBB
                const building = osbb.buildingId ? await buildingsCollection.findOne({ _id: new ObjectId(osbb.buildingId) }) : null;
                if (!building) {
                    console.warn('Building not found or buildingId is null for OSBB:', OSBBId);
                }

                // Находим город по cityId из здания (если здание найдено)
                const city = building?.cityId ? await cityCollection.findOne({ _id: new ObjectId(building.cityId) }) : null;
                if (!city) {
                    console.warn('City not found or cityId is null for building:', building?._id);
                }

                // Находим улицу по streetId из здания (если здание найдено)
                const street = building?.streetId ? await streetCollection.findOne({ _id: new ObjectId(building.streetId) }) : null;
                if (!street) {
                    console.warn('Street not found or streetId is null for building:', building?._id);
                }

                // Возвращаем данные с учётом того, что некоторые могут быть null
                res.json({
                    ...osbb,
                    building: building || null,
                    city: city || null,
                    street: street || null
                });
            } catch (error) {
                console.error('Error fetching OSBB details:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        };

    } catch (error) {
        console.error('Error fetching accounts by accountId:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.addResidents = async (req, res) => {
    const { userId, personalAccountId, personId } = req.body;
    const db = getDB();
    const userstopersonalaccountsCollection = db.collection('userstopersonalaccounts');
    const residentsToPersonalAccountsCollection = db.collection('residentstopersonalaccounts');
    try {
        const newResident = {
            personId: new ObjectId(personId),
            personalAccountId: new ObjectId(personalAccountId),
            code: generateAuthCode()
        };

        await residentsToPersonalAccountsCollection.insertOne(newResident);


        res.status(201).json({ message: 'Проживающий успешно добавлен' });
    }
    catch (error) {
        console.error('Ошибка при добавлении проживающего:', error);
        res.status(500).json({ message: 'Ошибка при добавлении проживающего:' });
    }

}
exports.addPersonalAccount = async (req, res) => {
    const { flatNum, totalArea, heatingArea, personId } = req.body;
    const { buildingId } = req.params;

    console.log("Received data:", { flatNum, totalArea, heatingArea, personId, buildingId });

    const personalNumber = `PA-${Math.floor(Math.random() * 1000)}`;

    try {
        const db = getDB();
        const personalAccountsCollection = db.collection('personalaccounts');
        const personsCollection = db.collection('persons');
        const ownersToPersonalAccountsCollection = db.collection('ownerstopersonalaccounts');

        const newPersonalAccount = {
            buildingId: new ObjectId(buildingId),
            flatNum: flatNum,
            totalArea: totalArea,
            heatingArea: heatingArea,
            personId: new ObjectId(personId),
            typeId: new ObjectId('66fa910be56c444d19edfe18'),
            personalNumber: personalNumber,
            code: generateAuthCode()
        };

        const person = personsCollection.findOne({_id: new ObjectId(newPersonalAccount.personId)});
        const personalAccountResult = await personalAccountsCollection.insertOne(newPersonalAccount);
        const personalAccountId = personalAccountResult.insertedId;

        sendAuthCode(person.email, code);

        const ownerToAccountLink = {
            personId: new ObjectId(personId),
            personalAccountId: new ObjectId(personalAccountId),
        };

        await ownersToPersonalAccountsCollection.insertOne(ownerToAccountLink);

        res.status(201).json({ message: 'Квартира успешно добавлена и привязана к владельцу', personalNumber });
    } catch (error) {
        console.error('Ошибка при добавлении лицевого счета:', error);
        res.status(500).json({ message: 'Ошибка при добавлении данных о квартире' });
    }
};

exports.updateOSBBDetails = async (req, res) => {
    const { OSBBId, BuildingId, StreetId, CityId } = req.params;

    try {
        const db2 = getDB();

        const osbbOrganisationsCollection = db2.collection('osbborganizations');
        const buildingsCollection = db2.collection('buildings');
        const citiesCollection = db2.collection('cities');
        const streetsCollection = db2.collection('streets');

        const { name, taxcode, buildingNum, streetname, cityname } = req.body;

        const updatedOsbb = {
            name: name,
            taxcode: taxcode,
        };

        const osbbResult = await osbbOrganisationsCollection.updateOne(
            { _id: new ObjectId(OSBBId) },
            { $set: updatedOsbb }
        );

        const updatedBuilding = {
            buildingNum: buildingNum,
        };

        const buildingResult = await buildingsCollection.updateOne(
            { _id: new ObjectId(BuildingId) },
            { $set: updatedBuilding }
        );

        const updatedCity = {
            name: cityname,
        };

        const cityResult = await citiesCollection.updateOne(
            { _id: new ObjectId(CityId) },
            { $set: updatedCity }
        );

        const updatedStreet = {
            name: streetname,
        };

        const streetResult = await streetsCollection.updateOne(
            { _id: new ObjectId(StreetId) },
            { $set: updatedStreet }
        );

        res.status(200).json({
            message: 'Записи успешно обновлены',
            OSBBId: OSBBId,
        });

    } catch (error) {
        console.error('Ошибка при обновлении записей:', error);
        res.status(500).json({ message: 'Ошибка при обновлении данных' });
    }
};

exports.insertOSBB = async (req, res) => {
    try {
        const db2 = getDB();

        const osbbOrganisationsCollection = db2.collection('osbborganizations');
        const buildingsCollection = db2.collection('buildings');
        const citiesCollection = db2.collection('cities');
        const streetsCollection = db2.collection('streets');

        const { name, taxcode, buildingNum, streetname, cityname } = req.body;

        const newCity = {
            name: cityname,
        };
        const cityResult = await citiesCollection.insertOne(newCity);
        const cityId = cityResult.insertedId;

        const newStreet = {
            name: streetname,
        };
        const streetResult = await streetsCollection.insertOne(newStreet);
        const streetId = streetResult.insertedId;

        const newBuilding = {
            buildingNum: buildingNum,
            cityId: cityId,
            streetId: streetId,
        };
        const buildingResult = await buildingsCollection.insertOne(newBuilding);
        const buildingId = buildingResult.insertedId;

        const newOsbb = {
            name: name,
            taxcode: taxcode,
            buildingId: buildingId,
        };
        const osbbResult = await osbbOrganisationsCollection.insertOne(newOsbb);

        res.status(201).json({
            message: 'Записи успешно добавлены'
        });

    } catch (error) {
        console.error('Ошибка при добавлении записей:', error);
        res.status(500).json({ message: 'Ошибка при добавлении данных' });
    }
};

exports.deleteOSBB = async (req, res) => {

};

exports.getData = async (req, res) => {
    try {
        const db2 = getDB();
        const osbbCount = await db2.collection('osbborganizations').countDocuments();
        const userCount = await db2.collection('users').countDocuments();

        res.json({ count: osbbCount, count2: userCount });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных ОСББ.' });
    }
};

exports.sendEmail = async (req, res) => {

    const { email, text } = req.body;
    try {
        sendEmail(email, text);
        res.json({ message: 'Email отправлен' });

    } catch (error) {
        res.status(500).json({ error: 'Ошибка при отправке email.' });
    }
}

exports.getApartments = async (req, res) => {
    try {
        const { OSBBId } = req.params;
        console.log(OSBBId);
        const db2 = getDB();
        const PersonalAccounts = db2.collection('personalaccounts');

        const apartments = await PersonalAccounts
            .find({ buildingId: new ObjectId(OSBBId) })
            .toArray();

        if (!apartments.length) {
            return res.status(404).json({ message: 'Квартиры не найдены' });
        }
        console.log(apartments);
        res.status(200).json(apartments);
    } catch (error) {
        console.error('Ошибка при получении квартир:', error);
        res.status(500).json({ message: 'Ошибка при получении данных' });
    }
};

exports.getSaldos = async (req, res) => {
    try {
        const { accountId } = req.params;
        const db2 = getDB();
        const saldosCollection = db2.collection('saldos');

        const saldos = await saldosCollection
            .find({ personalAccountId: new ObjectId(accountId) })
            .toArray();

        if (!saldos.length) {
            return res.status(404).json({ message: 'Задолженности не найдены' });
        }

        res.status(200).json(saldos);
    } catch (error) {
        console.error('Ошибка при получении задолженностей:', error);
        res.status(500).json({ message: 'Ошибка при получении задолженностей' });
    }
};

exports.addSaldo = async (req, res) => {
    try {
        const { accountId } = req.params;
        const { date, sum, description } = req.body;
        if (!date || !sum || !accountId) {
            return res.status(400).json({ message: 'Все обязательные поля должны быть указаны: accountId, date, sum.' });
        }

        const db = getDB();
        const saldos = db.collection('saldos');

        const newSaldo = {
            personalAccountId: new ObjectId(accountId),
            date: date,
            sum: sum,
            description: description
        };

        await saldos.insertOne(newSaldo);


        res.status(201).json({ message: 'Задолженность успешно добавлена.', saldo: newSaldo });
    } catch (error) {
        console.error('Ошибка при добавлении задолженности:', error);
        res.status(500).json({ message: 'Ошибка сервера при добавлении задолженности.' });
    }
};
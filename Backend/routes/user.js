const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const measurersController = require('../controllers/measurersController');
const osbbController = require('../controllers/osbbController');
const paymentsController = require('../controllers/paymentsController');
const servicesController = require('../controllers/servicesController');
const votingsController = require('../controllers/votingController');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/dataformain', osbbController.getData);

router.get('/osbblist', authMiddleware(['admin']), osbbController.getOSBBList);
router.get('/sendcode/:personalCode/:login', authMiddleware(['user' , 'admin']), osbbController.verifyPersonalCode);
router.post('/addResidents', authMiddleware(['admin']), osbbController.addResidents);
router.get('/osbbdetails/:OSBBId', authMiddleware(['admin']), osbbController.getOSBBDetails);
router.post('/addPersonalAccount/:buildingId', authMiddleware(['admin']), osbbController.addPersonalAccount);

router.post('/addSaldo/:accountId', authMiddleware(['admin']), osbbController.addSaldo);
router.post('/createpayment', paymentsController.createPayment);

router.post('/updatedataosbb/:OSBBId/:BuildingId/:StreetId/:CityId', authMiddleware(['admin']), osbbController.updateOSBBDetails);
router.post('/deletedataosbb/:OSBBId/:BuildingId/:StreetId/:CityId', authMiddleware(['admin']), osbbController.deleteOSBB);
router.post('/insertdataosbb', authMiddleware(['admin']), osbbController.insertOSBB);
router.get('/accounts/:login/:email', authMiddleware(['user', 'admin']), accountController.getAccounts);
router.get('/account/:accountId', authMiddleware(['user', 'admin']), accountController.getAccount);
router.get('/accountdetails/:accountId', authMiddleware(['user', 'admin']), accountController.getAccountDetails);
router.get('/accountresidentsowners/:accountId', authMiddleware(['user', 'admin']), accountController.getAccountResidentsAndOwners);

router.get('/measurers/:accountId', authMiddleware(['user', 'admin']), measurersController.getMeasurers);
router.get('/measurer/:measurerId', authMiddleware(['user', 'admin']), measurersController.getMeasurerDetails);
router.post('/insertdatameasurer/:measurertopersonalaccountId', authMiddleware(['admin']), measurersController.insertDataMeasurer);
router.post('/deletedatameasurer/:recordId', authMiddleware(['admin']), measurersController.deleteDataMeasurer);
router.post('/updatedatameasurer/:recordId', authMiddleware(['admin']), measurersController.updateDataMeasurer);
router.get('/services/:accountId', authMiddleware(['admin', 'user']), servicesController.getServices);
router.get('/payments/:accountId', authMiddleware(['admin', 'user']), paymentsController.getPayments);
router.get('/spendings/:accountId', authMiddleware(['admin', 'user']), paymentsController.getSpendings);
router.get('/votings/:accountId', authMiddleware(['admin', 'user']), votingsController.getVotings);
router.get('/questions/:votingId', authMiddleware(['admin', 'user']), votingsController.getVotingQuestions);
router.post('/submit/:accountId', authMiddleware(['admin', 'user']), votingsController.submitVotingQuestions);
router.get('/votingresults/:accountId', authMiddleware(['admin', 'user']), votingsController.getAllVotingsWithResults);
router.post('/votingcreate/:OSBBId', authMiddleware(['admin']), votingsController.createVoting);
router.delete('/votings/:votingId', authMiddleware(['admin']), votingsController.deleteVoting);
router.get('/me/:accountId', authMiddleware(['admin', 'user']), profileController.getProfile);
router.post('/updatecontact/:personId', authMiddleware(['admin', 'user']), profileController.updateContact);

router.get('/getApartments/:OSBBId', authMiddleware(['admin']), osbbController.getApartments);
router.get('/getSaldos/:accountId', authMiddleware(['admin', 'user']), osbbController.getSaldos);

module.exports = router;

const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

exports.getVotings = async (req, res) => {
    const { accountId } = req.params;
    try {
        const db2 = getDB();

        const personalAccountCollection = db2.collection('personalaccounts');
        const buildingCollection = db2.collection('buildings');
        const osbbCollections = db2.collection('osbborganizations');
        const votingCollection = db2.collection('votings');
        const votingresultCollection = db2.collection('votingresults');

        const account = await personalAccountCollection.findOne({ _id: new ObjectId(accountId) });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const building = await buildingCollection.findOne({ _id: new ObjectId(account.buildingId) });
        if (!building) {
            return res.status(404).json({ message: 'Building not found' });
        }

        const osbb = await osbbCollections.findOne({ buildingId: new ObjectId(building._id) });
        if (!osbb) {
            return res.status(404).json({ message: 'OSBB not found' });
        }

        const votings = await votingCollection.find({ osbbId: new ObjectId(osbb._id) }).toArray();

        const votingResults = await votingresultCollection.find({ personalaccountId: new ObjectId(accountId) }).toArray();
        const votedVotingIds = new Set(votingResults.map(result => result.votingId.toString()));


        const availableVotings = votings.filter(voting => !votedVotingIds.has(voting._id.toString()));

        res.json(availableVotings);
    } catch (error) {
        console.error('Error fetching votings by accountId:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllVotingsWithResults = async (req, res) => {
    const { accountId } = req.params;
    try {
        const db2 = getDB();

        const personalAccountCollection = db2.collection('personalaccounts');
        const buildingCollection = db2.collection('buildings');
        const osbbCollections = db2.collection('osbborganizations');
        const votingCollection = db2.collection('votings');
        const questionsCollection = db2.collection('questions');
        const votingQuestionsCollections = db2.collection('votingquestions');
        const votingResultsCollection = db2.collection('votingresults');

        const account = await personalAccountCollection.findOne({ _id: new ObjectId(accountId) });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const building = await buildingCollection.findOne({ _id: new ObjectId(account.buildingId) });
        if (!building) {
            return res.status(404).json({ message: 'Building not found' });
        }

        const osbb = await osbbCollections.findOne({ buildingId: new ObjectId(building._id) });
        if (!osbb) {
            return res.status(404).json({ message: 'OSBB not found' });
        }

        const votings = await votingCollection.find({ osbbId: new ObjectId(osbb._id) }).toArray();

        for (const voting of votings) {
            const votingToQuestions = await votingQuestionsCollections.find({ votingId: new ObjectId(voting._id) }).toArray();
            const questionIds = votingToQuestions.map(vq => vq.questionId);
            const questions = await questionsCollection.find({ _id: { $in: questionIds } }).toArray();

            voting.questions = questions;

            const results = await votingResultsCollection.find({ votingId: new ObjectId(voting._id) }).toArray();

            const voteStats = {};
            for (const question of questions) {
                voteStats[question._id] = {
                    question: question.content,
                    yesVotes: 0,
                    noVotes: 0,
                    abstainedVotes: 0,
                };
            }
            for (const result of results) {
                const resultString = result.result ? result.result.toString('base64') : null;
                const questionId = result.questionId;

                if (voteStats[questionId]) {
                    if (resultString === "AA==") {
                        voteStats[questionId].yesVotes += 1; 
                    } else if (resultString === "Ag==") {
                        voteStats[questionId].abstainedVotes += 1;
                    } else if (resultString === "AQ==") {
                        voteStats[questionId].noVotes += 1; 
                    }
                }
            }

            voting.voteStats = voteStats;
        }
        res.status(200).json(votings);
    } catch (error) {
        console.error('Error fetching all votings with results:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getVotingQuestions = async (req, res) => {
    const { votingId } = req.params;
    try {
        const db2 = getDB();

        const votingCollection = db2.collection('votings');
        const questionsCollection = db2.collection('questions');
        const votingQuestionsCollections = db2.collection('votingquestions');

        const voting = await votingCollection.findOne({ _id: new ObjectId(votingId) });
        const votingsToQuestions = await votingQuestionsCollections.find({ votingId: new ObjectId(votingId) }).toArray();
        const questionIds = await votingsToQuestions.map(questionId => questionId.questionId);
        const questions = await questionsCollection.find({ _id: { $in: questionIds } }).toArray();

        res.json({
            voting,
            questions
        });
    } catch (error) {
        console.error('Error fetching accounts by accountId:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.submitVotingQuestions = async (req, res) => {
    const { accountId } = req.params;
    const { votingId, answers } = req.body;

    try {

        const db2 = getDB();
        const votingResultCollections = db2.collection('votingresults');

        for (const [questionId, encodedAnswer] of Object.entries(answers)) {
            const resultBuffer = Buffer.from(encodedAnswer, 'base64');

            const existingResult = await votingResultCollections.findOne({
                personalaccountId: new ObjectId(accountId),
                votingId: new ObjectId(votingId),
                questionId: new ObjectId(questionId),
            });

            if (existingResult) {
                await votingResultCollections.updateOne(
                    { _id: existingResult._id },
                    { $set: { result: resultBuffer } }
                );
            } else {
                await votingResultCollections.insertOne({
                    personalaccountId: new ObjectId(accountId),
                    votingId: new ObjectId(votingId),
                    questionId: new ObjectId(questionId),
                    result: resultBuffer
                });
            }
        }

        return res.status(200).json({ message: 'Voting results submitted/updated successfully' });
    } catch (error) {
        console.error('Error submitting voting questions:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getUserVotingResults = async (req, res) => {
    const { accountId, votingId } = req.params;
    try {
        const db2 = getDB();
        const votingResultCollections = db2.collection('votingresults');

        const userResults = await votingResultCollections.find({
            personalaccountId: new ObjectId(accountId),
            votingId: new ObjectId(votingId)
        }).toArray();

        return res.status(200).json({ answers: userResults });

    } catch (error) {
        console.error('Error fetching voting results for user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllVotingResults = async (req, res) => {
    const { votingId } = req.params;
    try {
        const db2 = getDB();
        const votingResultCollections = db2.collection('votingresults');
        const personalAccountCollection = db2.collection('personalaccounts');
        const personCollection = db2.collection('persons');
        const questionsCollection = db2.collection('questions');
        const votingQuestionsCollections = db2.collection('votingquestions');

        const votingsToQuestions = await votingQuestionsCollections.find({ votingId: new ObjectId(votingId) }).toArray();
        const questionIds = votingsToQuestions.map(vq => vq.questionId); 
        const questions = await questionsCollection.find({ _id: { $in: questionIds } }).toArray();
        const results = await votingResultCollections.find({ votingId: new ObjectId(votingId) }).toArray();

        const voteStats = {};
        const participants = [];

        for (const question of questions) {
            voteStats[question._id] = {
                question: question.text,
                yesVotes: 0,
                noVotes: 0,
                abstainedVotes: 0,
            };
        }

        for (const result of results) {
            const resultString = result.result ? result.result.toString('base64') : null;
            const questionId = result.questionId;

            if (voteStats[questionId]) {
                if (resultString === "AQ==") {
                    voteStats[questionId].yesVotes += 1; 
                } else if (resultString === null) {
                    voteStats[questionId].abstainedVotes += 1;
                } else if (resultString === "AA==") {
                    voteStats[questionId].noVotes += 1; 
                }
            }

            const account = await personalAccountCollection.findOne({ _id: result.personalaccountId });
            if (account && account.personId) {
                const personAlreadyAdded = participants.some(participant => participant._id.equals(account.personId));

                if (!personAlreadyAdded) {
                    const person = await personCollection.findOne({ _id: account.personId });
                    if (person) {
                        participants.push({
                            _id: account.personId,
                            firstname: person.firstname,
                            middlename: person.middlename,
                            lastname: person.lastname,
                            answers: {}
                        });
                    }
                }

                const participantIndex = participants.findIndex(participant => participant._id.equals(account.personId));
                if (participantIndex !== -1) {
                    participants[participantIndex].answers[questionId] = resultString === "AQ==" ? true : resultString === "AA==" ? false : null;
                }
            }
        }
        res.status(200).json({
            votingId,
            voteStats,
            participants,
        });
    } catch (error) {
        console.error('Error fetching voting results for user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createVoting = async (req, res) => {
    const { OSBBId } = req.params; 
    const { title, startDate, endDate, questions } = req.body; 

    try {
        const db2 = getDB();
        const votingsCollection = db2.collection('votings');
        const questionsCollection = db2.collection('questions');
        const votingQuestionsCollection = db2.collection('votingquestions');

        const newVoting = {
            title,
            startDate: new Date(startDate), 
            endDate: new Date(endDate),  
            osbbId: new ObjectId(OSBBId),  
            createdAt: new Date(),
        };

        const votingResult = await votingsCollection.insertOne(newVoting);
        const votingId = votingResult.insertedId;
        const questionIds = [];

        for (const question of questions) {
            const existingQuestion = await questionsCollection.findOne({ text: question.text });
            let questionId;

            if (existingQuestion) {
                questionId = existingQuestion._id;
            } else {
                const newQuestionResult = await questionsCollection.insertOne({
                    content: question.text,
                    createdAt: new Date(),
                });
                questionId = newQuestionResult.insertedId;
            }

            questionIds.push(questionId);

            await votingQuestionsCollection.insertOne({
                votingId: votingId,
                questionId: questionId,
            });
        }

        res.status(201).json({ message: 'Voting created successfully', votingId });
    } catch (error) {
        console.error('Error creating voting:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteVoting = async (req, res) => {
    const {votingId} = req.params;

    try {
        const db2 = getDB();
        const votingsCollection = db2.collection('votings');
        const votingQuestionsCollection = db2.collection('votingquestions');
        const questionsCollection = db2.collection('questions');
        const votingResultsCollection = db2.collection('votingresults');

        const votingQuestions = await votingQuestionsCollection.find({ votingId: new ObjectId(votingId) }).toArray();
        const questionIds = votingQuestions.map(vq => vq.questionId);
        await votingResultsCollection.deleteMany({ votingId: new ObjectId(votingId) });
        await votingQuestionsCollection.deleteMany({ votingId: new ObjectId(votingId) });

        for (const questionId of questionIds) {
            const count = await votingQuestionsCollection.countDocuments({ questionId: questionId });
            if (count === 0) {
                await questionsCollection.deleteOne({ _id: new ObjectId(questionId) });
            }
        }

        await votingsCollection.deleteOne({ _id: new ObjectId(votingId) });
        res.status(200).json({ message: 'Voting deleted successfully' });
    } catch (error) {
        console.error('Error deleting voting:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
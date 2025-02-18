import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const VotingCheck = () => {
    const token = localStorage.getItem('token');
    const [votingData, setVotingData] = useState([]);
    const [selectedVoting, setSelectedVoting] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const accountId = localStorage.getItem('accountId');

    useEffect(() => {
        const fetchVotingData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/votingresults/${accountId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setVotingData(response.data);
            } catch (error) {
                console.error('Error fetching voting data:', error);
            }
        };

        fetchVotingData();
    }, [token]);

    const calculatePercentages = (yesVotes, noVotes, abstainedVotes) => {
        const totalVotes = yesVotes + noVotes + abstainedVotes;
        return {
            yesPercentage: totalVotes > 0 ? ((yesVotes / totalVotes) * 100) : 0,
            noPercentage: totalVotes > 0 ? ((noVotes / totalVotes) * 100) : 0,
            abstainedPercentage: totalVotes > 0 ? ((abstainedVotes / totalVotes) * 100) : 0,
        };
    };

    const handleVotingClick = (voting) => {
        setSelectedVoting(voting);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedVoting(null);
    };

    return (
        <div>
            <div className="flex items-center ml-10 mt-5">
                <Link className='text-base text-gray-500' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                    Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Link>
                <Link className='text-base text-gray-500' style={{ fontFamily: 'Arsenal' }} to={'/user/collections/'}>
                    Збори&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Link>
                <Link className='underline text-base text-gray-500' style={{ fontFamily: 'Arsenal' }} to={'/user/votings'}>
                    Історія Голосувань
                </Link>
            </div>
            <div className='mt-10'>
                <Typography className="text-center text-3xl text-black mb-6">
                    ЗБОРИ
                </Typography>
                <Typography variant="h5" className="text-center text-xl text-black">
                    ІСТОРІЯ ГОЛОСУВАНЬ
                </Typography>
            </div>
            <div className="space-y-10 mt-8 mx-auto relative" style={{ width: '80%' }}>
                {votingData.map((voting, votingIndex) => (
                    <div key={voting._id} className="relative">
                        <Typography variant="h5" className="text-black mb-4 text-center">
                            {voting.title}
                        </Typography>
                        {Object.keys(voting.voteStats).map((key, questionIndex) => {
                            const voteStats = voting.voteStats[key];
                            const percentages = calculatePercentages(voteStats.yesVotes, voteStats.noVotes, voteStats.abstainedVotes);

                            return (
                                <div key={key} className="bg-[#C4C3E3] p-10 mb-6 rounded-3xl shadow-md">
                                    <Typography className="text-black text-2xl">
                                        {questionIndex + 1}. {voteStats.question}
                                    </Typography>
                                    <div className="mt-2">
                                        <Typography>За: {percentages.yesPercentage}%</Typography>
                                        <Typography>Проти: {percentages.noPercentage}%</Typography>
                                        <Typography>Утримався: {percentages.abstainedPercentage}%</Typography>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VotingCheck;

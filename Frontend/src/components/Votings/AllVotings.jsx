import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Button, Typography } from "@material-tailwind/react";

const AllVotings = () => {
    const [votings, setVotings] = useState([]);
    const token = localStorage.getItem('token');
    const accountId = localStorage.getItem('accountId');
    const navigate = useNavigate();

    const formatVotingDate = (startDate, endDate) => {
        const monthNames = [
            "січня", "лютого", "березня", "квітня", "травня", "червня",
            "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
        ];

        const start = new Date(startDate);
        const end = new Date(endDate);

        const startDay = start.getDate();
        const endDay = end.getDate();
        const month = monthNames[start.getMonth()];
        const year = start.getFullYear();

        return `Дата голосування: ${startDay}-${endDay} ${month} ${year} року`;
    };


    useEffect(() => {
        const fetchVotings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/votings/${accountId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setVotings(response.data);
            } catch (error) {
                console.error('Ошибка получения голосований:', error);
            }
        };

        fetchVotings();
    }, [token, accountId]);

    const handleVotingClick = async (votingId) => {
        localStorage.setItem("votingId", votingId);
        navigate(`/user/voting/${votingId}`);
    }

    return (
        <div>
            <div className="flex items-center ml-10 mt-5">
                <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                    Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Link>
                <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/user/collections/'}>
                    Збори&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Link>
                <Link className='underline text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/user/votings'}>
                    Голосування
                </Link>
            </div>
            <div className='mt-10'>
                <Typography style={{ color: "#A3B565"}} variant="h1" className="text-center mb-2">
                    Голосування
                </Typography>
                <Typography variant="h5" className="text-center mb-2">
                    ОНЛАЙН-ГОЛОСУВАННЯ
                </Typography>
            </div>
            <div className="space-y-10 flex flex-col items-center mt-8 mb-10" style={{ width: '100%' }}>
                {votings.length > 0 ? ( votings.map((voting, index) => (
                    <div key={voting._id} className="relative flex flex-col items-center" style={{ width: '80%' }}>
                        {index > 0 && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 flex flex-col items-center" style={{ height: '40px' }}>
                                <div className="w-3 h-3 bg-[#504E76] rounded-full"></div>
                                <div className="w-1 bg-[#504E76] flex-1 h-20"></div>
                                <div className="w-3 h-3 bg-[#504E76] rounded-full"></div>
                            </div>
                        )}
                        <div className="bg-[#FDF8E2] p-6 rounded-xl shadow-md flex justify-between items-center" style={{ width: '100%', height: '20vh' }}>
                            <div className="flex-col">
                                <Typography variant="h6" className="text-black">
                                    {index + 1}. {voting.title}
                                </Typography>
                                <div className="mt-4">
                                    <Typography className="text-black">
                                        {formatVotingDate(voting.startDate, voting.endDate)}
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={() => handleVotingClick(voting._id)} className="bg-[#504E76] w-96 h-20 text-xl rounded-3xl">
                                    <div className="font-thin">
                                        ПРИЙНЯТИ УЧАСТЬ
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))):(
                    <Typography variant='h1' style={{ color: "green", fontFamily: 'Philosopher' }}>Голосування відсутні</Typography>
                )}
            </div>
        </div>
    );
};

export default AllVotings;



{/* <Button onClick={() => handleVotingClick(voting._id)} className='bg-[#504E76] w-40 h-20'>
ЗА
</Button>
<Button onClick={() => handleVotingClick(voting._id)} className='bg-[#504E76] w-40 h-20'>
ПРОТИ
</Button>
<Button onClick={() => handleVotingClick(voting._id)} className='bg-[#504E76] w-40 h-20'>
УТРИМАВСЯ
</Button> */}



// const handleCheckClick = async (votingId) => {
//     localStorage.setItem("votingId", votingId);
//     navigate(`/admin/votingcheck/${votingId}`);
// }

// const handleDeleteClick = async (votingId) => {
//     try {
//         console.log(votingId);
//         await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/votings/${votingId}`, {
//             headers: { Authorization: `Bearer ${token}` }
//         });
//         setVotings(votings.filter(voting => voting._id !== votingId));
//     } catch (error) {
//         console.error('Ошибка при удалении голосования:', error);
//     }
// }
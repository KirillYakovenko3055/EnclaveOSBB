import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button } from "@material-tailwind/react";

const Voting = () => {
    const token = localStorage.getItem('token');
    const accountId = localStorage.getItem('accountId');
    const votingId = localStorage.getItem("votingId");
    const navigate = useNavigate();
    const [additionalData, setAdditionalData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({}); 

    useEffect(() => {
        const fetchVotingData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/questions/${votingId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAdditionalData(response.data);
                setQuestions(response.data.questions);
            } catch (error) {
                console.error('Ошибка получения данных о голосовании или ответах:', error);
            }
        };

        fetchVotingData();
    }, [votingId, token, accountId]);

    const handleAnswerChange = (questionId, value) => {
        const encodedValue = value === 'for' ? 'AA==' : value === 'against' ? 'AQ==' : 'Ag==';
    
        setAnswers(prevAnswers => {
            const filteredAnswers = Object.keys(prevAnswers)
                .filter(id => id !== questionId)
                .reduce((obj, key) => {
                    obj[key] = prevAnswers[key];
                    return obj;
                }, {});
    
            const updatedAnswers = {
                ...filteredAnswers,
                [questionId]: encodedValue
            };
    
            const updatedQuestions = questions.filter(question => question._id !== questionId);
            setQuestions(updatedQuestions);
    
            if (updatedQuestions.length === 0) {
                handleSubmit(updatedAnswers);
            }
    
            return updatedAnswers;
        });
    };

    const handleSubmit = async (currentAnswers) => {

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/submit/${accountId}`, {
                votingId,
                answers: currentAnswers
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnswers({});
            navigate(`/user/votings`);
        } catch (error) {
            console.error('Ошибка при отправке результатов голосования:', error);
        }
    };

    if (!additionalData) {
        return <div>Загрузка информации...</div>;
    }

    return (
        <div>
            <div className="mt-6">
                <div className="flex items-center ml-10">
                    <Link className='text-base text-gray-500' size='sm' to={'/'}>
                        Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                    </Link>
                    <Link className='text-base text-gray-500' size='sm' to={'/user/collections/'}>
                        Збори&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                    </Link>
                    <Link className='text-base text-gray-500' size='sm' to={'/user/votings'}>
                        Голосування&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                    </Link>
                    <Link className='underline text-base text-gray-500' size='sm' to={'/user/votings'}>
                        {additionalData.voting.title}
                    </Link>
                </div>
                <Typography className="text-center text-3xl mt-10">{additionalData.voting.title}</Typography>
            </div>
            <div className="container mx-auto p-10" style={{ width: '100%' }}>
                <div className="space-y-10 flex flex-col" style={{ width: '100%' }}>
                    { questions.length > 0 ? (questions.map((question, index) => (
                        <div key={question._id} className="relative flex flex-col items-center" style={{ width: '100%' }}>
                            {index > 0 && (
                                <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 flex flex-col items-center" style={{ height: '40px' }}>
                                    <div className="w-3 h-3 bg-[#504E76] rounded-full"></div>
                                    <div className="w-1 bg-[#504E76] flex-1 h-20"></div>
                                    <div className="w-3 h-3 bg-[#504E76] rounded-full"></div>
                                </div>
                            )}
                            <div className="bg-[#FDF8E2] p-6 rounded-xl shadow-md" style={{ width: '100%', height: '50vh' }}>
                                <div className="flex-col">
                                    <Typography variant="h6" className="mb-4">
                                        {index + 1}. {question.content}
                                    </Typography>
                                    <Typography className="mb-4">
                                        {question.text}
                                    </Typography>
                                    <div className="flex flex-col items-center">
                                        <Button
                                            onClick={() => handleAnswerChange(question._id, 'for')} className="bg-[#504E76] w-96 h-16 text-2xl rounded-2xl mt-4">
                                            <div className="font-thin">
                                                ЗА
                                            </div>
                                        </Button>
                                        <Button
                                            onClick={() => handleAnswerChange(question._id, 'against')} className="bg-[#504E76] w-96 h-16 text-2xl rounded-2xl mt-4">
                                            <div className="font-thin">
                                                ПРОТИ
                                            </div>
                                        </Button>
                                        <Button
                                            onClick={() => handleAnswerChange(question._id, 'abstained')} className="bg-[#504E76] w-96 h-16 text-2xl rounded-2xl mt-4">
                                            <div className="font-thin">
                                                УТРИМАВСЯ
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))):(
                        <Typography variant='h1' style={{ color: "green", fontFamily: 'Philosopher' }}>Питання відсутні</Typography>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Voting;

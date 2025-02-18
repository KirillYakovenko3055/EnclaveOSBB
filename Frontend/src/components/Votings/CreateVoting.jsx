import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Input, Typography } from "@material-tailwind/react";

const CreateVoting = () => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [questions, setQuestions] = useState([{ text: '' }]); 
    const OSBBId = localStorage.getItem("OSBBId");
    const token = localStorage.getItem("token");

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].text = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: '' }]);
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index); 
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const votingData = {
            title,
            startDate,
            endDate,
            questions: questions.map(q => ({ text: q.text }))
        };

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/votingcreate/${OSBBId}`, votingData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle('');
            setStartDate('');
            setEndDate('');
            setQuestions([{ text: '' }]);
        } catch (error) {
            console.error('Ошибка при создании голосования:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#544C76] p-8">
            <div className="w-full max-w-3xl p-8 rounded-lg flex flex-col items-center">
                <Typography variant="h4" color="blue-gray" className="text-white mb-6">
                    Створити нове голосування
                </Typography>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center" >
                    <div className="w-full mb-4">
                    <Typography variant="small" className="text-white mb-2">
                            Назва
                        </Typography>
                        <Input
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2 bg-white"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full mb-4">
                    <Typography variant="small" className="text-white mb-2">
                    Дата початку
                        </Typography>
                        <Input
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2 bg-white"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full mb-4">
                    <Typography variant="small" className="text-white mb-2">
                    Дата кінцю
                        </Typography>
                        <Input
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2 bg-white"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                    <Typography variant="h5" className="text-white mb-4">
                        Питання:
                    </Typography>
                    {questions.map((question, index) => (
                        <div key={index} className="w-full flex mb-4">
                            
                            <Input
                                type="text"
                                value={question.text}
                                onChange={(e) => handleQuestionChange(index, e)}
                                placeholder={`Питання ${index + 1}`}
                                required
                                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2 bg-white"
                            />
                            <Button 
                                onClick={() => handleRemoveQuestion(index)} 
                                className="self-end text-[#544C76] bg-[#C4C3E3] ml-2"
                            >
                                Видалити
                            </Button>
                        </div>
                    ))}
                    <Button 
                        color="blue" 
                        onClick={handleAddQuestion} 
                        variant="outlined" 
                        className="m-5 rounded-full bg-[white] text-[#544C76] font-bold text-lg px-6 py-2 shadow-lg w-4/12"
                    >
                        Додати питання
                    </Button>
                    <Button 
                    type="submit" 
                        color="#C4C3E3" 
                        className="m-5 rounded-full bg-[#C4C3E3] text-[#544C76] font-bold text-lg px-6 py-2 shadow-lg w-6/12"
                    >
                        Створити
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateVoting;

import React, { useState, useEffect } from 'react';
import { Input, Button, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const AddMeasurerValue = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const navigate = useNavigate();
    const { recorddate, value } = location.state || {};
    const measurerToPersonalAccountId = localStorage.getItem('measurerToPersonalAccountId');
    const measurerId = localStorage.getItem('measurerId');
    const recordId = localStorage.getItem('recordId');

    const [formData, setFormData] = useState({
        date: '',
        reading: ''
    });


    useEffect(() => {
        if (recorddate) {
            setFormData({
                date: new Date(recorddate).toISOString().split('T')[0], 
                reading: value || '' 
            });
        } else {
            setFormData({
                date: '',
                reading: ''
            });
        }
    }, [recorddate, value]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!recorddate) {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/user/insertdatameasurer/${measurerToPersonalAccountId}`,
                    {
                        date: formData.date,
                        reading: formData.reading
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                navigate(`/user/measurer/${measurerToPersonalAccountId}`, { state: { measurerId: measurerId } });
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/user/updatedatameasurer/${recordId}`,
                    {
                        date: formData.date,
                        reading: formData.reading
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                navigate(`/user/measurer/${measurerId}`);
            }
        } catch (error) {
            console.error('Ошибка отправки данных:', error.response?.data || error);
        }
    };

    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <Typography variant="h4" color="blue" className="text-center mb-6">
                    Ввод показаний счетчика
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Typography variant="small" color="gray" className="mb-2">
                            Дата
                        </Typography>
                        <Input
                            type="date"
                            name="date" 
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Typography variant="small" color="gray" className="mb-2">
                            Показания
                        </Typography>
                        <Input
                            type="number"
                            name="reading"
                            value={formData.reading} 
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2"
                            placeholder="Введите показание"
                            required
                        />
                    </div>
                    <Button type="submit" fullWidth variant="gradient" color="blue">
                        {recorddate ? "Обновить" : "Внести"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddMeasurerValue;

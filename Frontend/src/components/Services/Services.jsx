import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Typography,
} from "@material-tailwind/react";

const Services = () => {
    const [services, setServices] = useState([]);
    const token = localStorage.getItem('token');
    const accountId = localStorage.getItem('accountId');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/services/${accountId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setServices(response.data);
            } catch (error) {
                console.error('Ошибка получения счетов:', error);
            }
        };

        fetchServices();
    }, []);


    return (

        <div className="card container mx-auto px-4 rounded-3xl">
            <div className="about-section">
                <Typography variant='h1' style={{ color: '#A3B565' }}>Список сервисов</Typography>
                <Typography variant='h2' style={{ color: '#002000' }}>Ваши сервисы:</Typography>
            </div>
            <div className="holder">
                {services.map(service => (
                    <div className="cont mx-auto px-4 rounded-3xl">
                        <div className="container">
                            <Typography variant='h4' key={service._id}>
                                Тип: {service.serviceDetails.name} 
                                <p>
                                    Дата: {service?.startDate ? new Date(service.startDate).toISOString().split('T')[0] : 'Данные отсутствуют'} - {service?.endDate ? new Date(service.endDate).toISOString().split('T')[0] : 'без окончания'}
                                </p>
                            </Typography>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Services;
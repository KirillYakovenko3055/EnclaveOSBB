import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Typography,
} from "@material-tailwind/react";

const Residents = () => {
    const [residents, setResidents] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResidents = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/residents`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setResidents(response.data);
            } catch (error) {
                console.error('Ошибка получения счетов:', error);
            }
        };

        fetchResidents();
    }, []);

    const handleResidentClick = async (residentId) => {
        try {
            localStorage.setItem("residentId", residentId);
            navigate(`/user/resident/${residentId}`);
        } catch (error) {
            console.error('Ошибка получения данных по счету:', error);
        }
    };

    return (
        <div className="card container mx-auto px-4 rounded-3xl">
            <div className="about-section">
                <Typography variant='h1' style={{ color: '#A3B565' }}>Список счетчиков</Typography>
                <Typography variant='h2' style={{ color: '#002000' }}>Ваши счетчики:</Typography>
            </div>
            <div className="holder">
                {residents.map(resident => (
                    <div className="cont mx-auto px-4 rounded-3xl">
                        <div className="container">
                            <Typography variant='h4' key={measurer._id} onClick={() => handleResidentClick(resident._id)}>
                                {resident.number}
                            </Typography>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Residents;
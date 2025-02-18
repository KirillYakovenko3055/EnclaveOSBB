import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Typography,
} from "@material-tailwind/react";

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const token = localStorage.getItem('token');
    const accountId = localStorage.getItem('accountId');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/payments/${accountId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setPayments(response.data);
            } catch (error) {
                console.error('Ошибка получения счетов:', error);
            }
        };

        fetchPayments();
    }, []);
    const sortedPayments = payments.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="card container mx-auto px-4 rounded-3xl">
            <div className="about-section">
                <Typography variant='h1' style={{ color: '#A3B565' }}>История оплат</Typography>
            </div>
            <div className="holder">
                {sortedPayments.map(payment => (
                    <div className="cont mx-auto px-4 rounded-3xl">
                        <div className="container">
                            <Typography variant='h4' key={payment._id} onClick={() => handleMeasurerClick(payment._id)}>
                                Тип оплаты: {payment.type}
                                Сумма оплаты: {payment.sum} Гривен
                                Дата оплаты: {new Date(payment.date).toISOString().split('T')[0]}
                            </Typography>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Payments;
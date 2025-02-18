import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Alert,
} from "@material-tailwind/react";

const MeasurerDetails = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [additionalData, setAdditionalData] = useState(null);
    const measurerId = localStorage.getItem("measurerId");

    useEffect(() => {
        const fetchMeasurerDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/measurer/${measurerId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setAdditionalData(response.data);
            } catch (error) {
                console.error('Ошибка получения данных по счету:', error);
            }
        };

        fetchMeasurerDetails();
    }, [measurerId, token]);

    const handleAddMeterReading = () => {
        if (additionalData.records[0]?.measurerToPersonalAccountId) {
            localStorage.setItem("measurerToPersonalAccountId", additionalData.records[0]?.measurerToPersonalAccountId);
            navigate('/user/add-measurer-data');
        } else {
            console.error("personalToAccountId отсутствует");
        }
    };

    const handleUpdateMeterReading = (date, value, recordId) => {
        if (additionalData.records[0]?.measurerToPersonalAccountId) {
            localStorage.setItem("recordId", recordId);
            navigate('/user/add-measurer-data', {
                state: { recorddate: date, value: value }
            });
        } else {
            console.error("personalToAccountId отсутствует");
        }
    };

    const handleDeleteRecord = async (recordId) => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/deletedatameasurer/${recordId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setAdditionalData((prevData) => ({
                ...prevData,
                records: prevData.records.filter(record => record._id !== recordId)
            }));
        } catch (error) {
            console.error('Ошибка при удалении записи:', error);
        }
    };

    if (!additionalData) {
        return <div>Загрузка информации...</div>;
    }
    const sortedRecords = additionalData.records.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div style={{ height: '100%' }}>
            <h1>Информация о счетчике {additionalData.measurer?.number || 'Данные отсутствуют'}</h1>
            <ul>
                <li>
                    Тип: {additionalData.type?.type || 'Данные отсутствуют'}
                </li>
                <li>
                    Время действия: {additionalData.measurersToAccounts?.startDate ? new Date(additionalData.measurersToAccounts.startDate).toISOString().split('T')[0] : 'Данные отсутствуют'} - {additionalData.measurersToAccounts?.endDate ? new Date(additionalData.measurersToAccounts.endDate).toISOString().split('T')[0] : 'Данные отсутствуют'}
                </li>
                <li>
                    Код производителя: {additionalData.measurersToAccounts?.vendorCode || 'Данные отсутствуют'}
                </li>
            </ul>

            <h2>История показаний счетчика</h2>
            <ul>
                {sortedRecords.map(record => (
                    <li key={record._id} style={{display: 'flex'}}>
                        <div onClick={() => handleUpdateMeterReading(record.date, record.value, record._id)}>
                            Дата: {new Date(record.date).toISOString().split('T')[0]} Показание: {record.value}
                        </div>
                        <Button
                            className="ml-4"
                            color="red"
                            size="sm"
                            onClick={() => handleDeleteRecord(record._id)}
                        >
                            Удалить
                        </Button>
                    </li>
                ))}
            </ul>

            <Button className="mt-6" onClick={handleAddMeterReading} variant="gradient" color="blue">
                Добавить новое показание
            </Button>
        </div>
    );
};

export default MeasurerDetails;

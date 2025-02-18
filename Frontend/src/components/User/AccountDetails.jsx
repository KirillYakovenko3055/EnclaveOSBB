import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
    Typography,
} from "@material-tailwind/react";

const AccountDetails = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const { accountData } = location.state || {};
    const [additionalData, setAdditionalData] = useState(null);

    if (!accountData) { 
        return <div>Нет данных об аккаунте</div>;
    }

    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/accountdetails/${accountData._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log(accountData._id);
                localStorage.setItem('accountId', accountData._id);
                setAdditionalData(response.data);

                if (!localStorage.getItem('pageReloaded')) {
                    localStorage.setItem('pageReloaded', 'true'); 
                    window.location.reload();
                }

            } catch (error) {
                console.error('Ошибка получения данных по счету:', error);
            }
        };

        fetchAccountDetails();
    }, [accountData._id, token]);


    if (!additionalData) {
        return <div>Загрузка информации...</div>;
    }

    return (
        <div className="card container mx-auto px-4 rounded-3xl">
            <div className="about-section">
                <Typography variant='h1' style={{ color: '#A3B565' }}>Информация о счете {accountData.personalNumber}</Typography>
            </div>
            <div className="holder">
                <div className="cont mx-auto px-4 rounded-3xl">
                    <div className="container text-black">
                        <Typography variant='h6'>
                            Город: {additionalData.city?.name || 'Данные отсутствуют'}
                        </Typography>
                        <Typography variant='h6'>
                            Улица: {additionalData.street?.name || 'Данные отсутствуют'}
                        </Typography>
                        <Typography variant='h6'>
                            Номер здания: {additionalData?.buildingNum || 'Данные отсутствуют'}
                        </Typography>
                        <Typography variant='h6'>
                            Номер квартиры: {accountData.flatNum || 'Данные отсутствуют'}
                        </Typography>
                        <Typography variant='h6'>
                            Площадь квартиры: {accountData.totalArea || 'Данные отсутствуют'}
                        </Typography>
                        <Typography variant='h6'>
                            Отапливаемая площадь: {accountData.heatingArea || 'Данные отсутствуют'}
                        </Typography>
                        <Typography variant='h6'>
                            Тип аккаунта: {additionalData.type?.name || 'Данные отсутствуют'}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;

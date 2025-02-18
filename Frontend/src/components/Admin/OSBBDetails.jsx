import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Typography } from "@material-tailwind/react";

const OSBBDetails = () => {
    const token = localStorage.getItem('token');
    const buildingId = localStorage.getItem('buildingId');
    const [additionalData, setAdditionalData] = useState(null);
    const [apartments, setApartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOSBBDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/osbbdetails/${buildingId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAdditionalData(response.data);
            } catch (error) {
                console.error('Ошибка получения данных по ОСББ:', error);
            }
        };

        const fetchApartments = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getApartments/${buildingId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setApartments(response.data);
            } catch (error) {
                console.error('Ошибка при получении квартир:', error);
            }
        };

        fetchOSBBDetails();
        fetchApartments();
    }, [buildingId, token]);

    const handleUpdateOSBB = () => {
        if (additionalData?.name && additionalData?.building && additionalData?.street && additionalData?.city) {
            navigate('/admin/add-OSBB-data', {
                state: {
                    name: additionalData.name,
                    taxcode: additionalData.taxcode,
                    buildingNum: additionalData.building.buildingNum,
                    streetname: additionalData.street.name,
                    cityname: additionalData.city.name
                }
            });
        } else {
            console.error("One of the required fields is missing.");
        }
    };

    const handleApartmentClick = (personalAccountId) => {
        navigate(`/admin/personal-account/${personalAccountId}`);
    };

    if (!additionalData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#544C76] p-8">
                <Typography variant="h4" color="white">Загрузка информации...</Typography>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#544C76] p-8">
            <Card className="w-full max-w-4xl p-8 rounded-lg bg-white shadow-lg">
                <Typography variant="h4" color="blue" className="text-[#544C76] mb-6">
                    Інформація о {additionalData.name}
                </Typography>
                <ul className="mb-6">
                    <li className="mb-2">
                        <Typography variant="small" color="gray">Податковий код: {additionalData?.taxcode || 'Данные отсутствуют'}</Typography>
                    </li>
                    <li className="mb-2">
                        <Typography variant="small" color="gray">Номер будинку: {additionalData.building?.buildingNum || 'Данные отсутствуют'}</Typography>
                    </li>
                    <li className="mb-2">
                        <Typography variant="small" color="gray">Вулиця: {additionalData.street?.name || 'Данные отсутствуют'}</Typography>
                    </li>
                    <li className="mb-2">
                        <Typography variant="small" color="gray">Місто: {additionalData.city?.name || 'Данные отсутствуют'}</Typography>
                    </li>
                </ul>

                <Button
                    className="rounded-full bg-[#C4C3E3] text-[#544C76] font-bold text-lg px-6 py-2 shadow-lg"
                    onClick={handleUpdateOSBB}
                >
                    Обновити
                </Button>

                {apartments.length > 0 ? (
                    <div className="mt-6">
                        <Typography variant="h5" color="blue" className="text-[#544C76] mb-4">Список квартир в будинку</Typography>
                        <ul className="space-y-4">
                            {apartments.map((apartment) => (
                                <li
                                    key={apartment.id}
                                    onClick={() => handleApartmentClick(apartment._id)}
                                    className="p-4 bg-[#C4C3E3] text-[#544C76] rounded-lg shadow-md cursor-pointer hover:bg-[#A8A7D1]"
                                >
                                    <Typography variant="h6" className="font-bold">
                                        Квартира №{apartment.flatNum}, Загальна площа: {apartment.totalArea} м², Опалювана площа: {apartment.heatingArea} м²
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="mt-6">
                        <Typography variant="h6" color="gray">Квартир в будинку нема</Typography>
                    </div>
                )}

                <Button
                    className="mt-6 rounded-full bg-[#C4C3E3] text-[#544C76] font-bold text-lg px-6 py-2 shadow-lg"
                    onClick={() => navigate('/admin/add-personal-account', { state: { buildingId } })}
                >
                    Додати квартиру
                </Button>

                <Button
                    className="mt-6 rounded-full bg-[#C4C3E3] text-[#544C76] font-bold text-lg px-6 py-2 shadow-lg"
                    onClick={() => navigate('/admin/createVoting', { state: { buildingId } })}
                >
                    Створити голосування 
                </Button>
            </Card>
        </div>
    );
};

export default OSBBDetails;

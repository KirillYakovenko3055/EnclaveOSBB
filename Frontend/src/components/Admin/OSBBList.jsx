import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Card } from "@material-tailwind/react";

const OSBBList = () => {
    const [OSBBList, setOSBBList] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOSBB = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/osbblist`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOSBBList(response.data);
            } catch (error) {
                console.error('Ошибка получения списка ОСББ:', error);
            }
        };

        fetchOSBB();
    }, []);

    const handleOSBBClick = async (buildingId, OSBBId) => {
        try {
            localStorage.setItem("OSBBId", OSBBId);
            localStorage.setItem("buildingId", buildingId);
            navigate(`/admin/${buildingId}`);
        } catch (error) {
            console.error('Ошибка перехода к данным ОСББ:', error);
        }
    };

    const handleOSBBAdd = async () => {
        navigate(`/admin/add-OSBB-data`);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#544C76] p-8">
            <div className="w-full max-w-4xl p-8 rounded-lg flex flex-col items-center bg-white shadow-lg">
                <Typography variant="h4" color="blue" className="text-[#544C76] mb-6">
                    Список ОСББ
                </Typography>
                <div className="w-full">
                    {OSBBList.length === 0 ? (
                        <Typography variant="h6" className="text-gray-500">
                            Список пустий
                        </Typography>
                    ) : (
                        <ul className="w-full">
                            {OSBBList.map(OSBB => (
                                <li key={OSBB.buildingId} onClick={() => handleOSBBClick(OSBB.buildingId, OSBB._id)} className="w-full mb-4">
                                    <Card className="p-4 bg-[#C4C3E3] text-[#544C76] shadow-md cursor-pointer hover:bg-[#A8A7D1]">
                                        <Typography variant="h6" className="text-lg font-bold">
                                            {OSBB.name}
                                        </Typography>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <Button className="mt-6 rounded-full bg-[#C4C3E3] text-[#544C76] font-bold text-lg px-6 py-2 shadow-lg" onClick={handleOSBBAdd}>
                    Додати ОСББ
                </Button>
            </div>
        </div>
    );
};

export default OSBBList;

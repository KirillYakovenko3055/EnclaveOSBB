import React, { useState, useEffect } from 'react';
import { Input, Button, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMeasurerValue = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const navigate = useNavigate();
    const { name, taxcode, buildingNum, streetname, cityname } = location.state || {};
    const OSBBId = localStorage.getItem('OSBBId');
    const BuildingId = localStorage.getItem('BuildingId');
    const StreetId = localStorage.getItem('StreetId');
    const CityId = localStorage.getItem('CityId');

    const [formData, setFormData] = useState({
        name: '',
        taxcode: '',
        buildingNum: '',
        streetname: '',
        cityname: ''
    });

    useEffect(() => {
        if (name) {
            setFormData({
                name: name, 
                taxcode: taxcode,
                buildingNum: buildingNum, 
                streetname: streetname,
                cityname: cityname, 
            });
        } else {
            setFormData({
                name: '',
                taxcode: '',
                buildingNum: '',
                streetname: '',
                cityname: ''
            });
        }
    }, [name, taxcode, buildingNum, streetname, cityname]);

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
            if (!name) {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/user/insertdataosbb`,
                    {
                        name: formData.name,
                        taxcode: formData.taxcode,
                        buildingNum: formData.buildingNum,
                        streetname: formData.streetname,
                        cityname: formData.cityname,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                navigate(`/admin`, { state: { OSBBId: OSBBId } });
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/user/updatedataosbb/${OSBBId}/${BuildingId}/${StreetId}/${CityId}`,
                    {
                        name: formData.name,
                        taxcode: formData.taxcode,
                        buildingNum: formData.buildingNum,
                        streetname: formData.streetname,
                        cityname: formData.cityname,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                navigate(`/admin/${OSBBId}`);
            }
        } catch (error) {
            console.error('Ошибка отправки данных:', error.response?.data || error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#544C76] p-8">
            <div className="w-full max-w-3xl p-8 rounded-lg flex flex-col items-center">
                <Typography variant="h4" color="blue" className="text-white mb-6">
                    Додати ОСББ
                </Typography>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                    <div className="mb-4 w-full">
                        <Typography variant="small" className="text-white mb-2">
                            Назва ОСББ
                        </Typography>
                        <Input
                            type="text"
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2 bg-white"
                            placeholder='Название'
                            required
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <Typography variant="small" className="text-white mb-2">
                            Податковий код
                        </Typography>
                        <Input
                            type="text"
                            name="taxcode"
                            value={formData.taxcode} 
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2 bg-white"
                            placeholder="Код"
                            required
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <Typography variant="small" className="text-white mb-2">
                            Номер будинку
                        </Typography>
                        <Input
                            type="text"
                            name="buildingNum"
                            value={formData.buildingNum} 
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2 bg-white"
                            placeholder="Номер"
                            required
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <Typography variant="small" className="text-white mb-2">
                            Вулиця
                        </Typography>
                        <Input
                            type="text"
                            name="streetname"
                            value={formData.streetname} 
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2 bg-white"
                            placeholder="Вулиця"
                            required
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <Typography variant="small" className="text-white mb-2">
                            Мiсто
                        </Typography>
                        <Input
                            type="text"
                            name="cityname"
                            value={formData.cityname} 
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2 bg-white"
                            placeholder="Мiсто"
                            required
                        />
                    </div>
                    <Button 
                        type="submit" 
                        color="#C4C3E3" 
                        className="m-5 rounded-full bg-[#C4C3E3] text-[#544C76] font-bold text-lg px-6 py-2 shadow-lg w-6/12"
                    >
                        {name ? "Обновити" : "Внести"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddMeasurerValue;
